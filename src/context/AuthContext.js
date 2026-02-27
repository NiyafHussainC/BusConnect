"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);
    const router = useRouter();

    // Initialize Mock Database if empty
    useEffect(() => {
        const users = localStorage.getItem("bus_users");
        if (!users || JSON.parse(users).length <= 2) {
            localStorage.setItem("bus_users", JSON.stringify([
                // Default Admin
                { id: 1, email: "admin@bustrack.com", password: "admin", role: "admin", name: "Super Admin", status: "active", credits: 0, coupons: [] },
                // Demo Customer
                { id: 2, email: "customer@demo.com", password: "user123", role: "customer", name: "Demo User", status: "active", credits: 0, coupons: [] },
                // Mock Pending Owners
                { id: 3, email: "suresh@kevintravels.com", password: "owner123", role: "owner", name: "Suresh Kevin", company: "Kevin Travels", city: "Bangalore", phone: "9876543210", status: "pending", joined: new Date(Date.now() - 86400000).toISOString() },
                { id: 4, email: "anita@royalcoaches.com", password: "owner123", role: "owner", name: "Anita Raj", company: "Royal Coaches", city: "Mumbai", phone: "9876543211", status: "pending", joined: new Date(Date.now() - 172800000).toISOString() },
                // Mock Active Owner
                { id: 5, email: "mohammed@zlines.com", password: "owner123", role: "owner", name: "Mohammed Z.", company: "Z-Lines", city: "Chennai", phone: "9876543212", status: "active", joined: new Date(Date.now() - 259200000).toISOString() }
            ]));
        }
    }, []);

    // Load active session
    useEffect(() => {
        const storedUser = localStorage.getItem("busConnectUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsAuthLoaded(true);
    }, []);

    const signup = (userData) => {
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");

        // Check duplicate
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: "Email already registered." };
        }

        const newUser = {
            ...userData,
            id: Date.now(),
            status: userData.role === 'owner' ? 'pending' : 'active',
            joined: new Date().toISOString(), // for admin view
            credits: 0, // default credits
            coupons: [] // default coupons
        };

        users.push(newUser);
        localStorage.setItem("bus_users", JSON.stringify(users));

        return { success: true };
    };

    const login = (email, password, role) => {
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const foundUser = users.find(u => u.email === email && u.password === password && u.role === role);

        if (!foundUser) {
            return { success: false, message: "Invalid credentials or role mismatch." };
        }

        if (foundUser.role === 'owner' && foundUser.status === 'pending') {
            return {
                success: false,
                message: "Your account is under verification. Please wait for admin approval.",
                code: 'PENDING_APPROVAL'
            };
        }

        // Mock Subscription for Owner
        let sessionUser = { ...foundUser };
        if (role === 'owner') {
            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setDate(startDate.getDate() + 30); // 30 Day Trial
            sessionUser.subscription = {
                plan: "Free Trial",
                limit: 2,
                activeBuses: 0,
                expiry: expiryDate.toISOString(),
                status: "active"
            };
        }

        setUser(sessionUser);
        localStorage.setItem("busConnectUser", JSON.stringify(sessionUser));

        if (role === 'owner') router.push('/owner/dashboard');
        else if (role === 'customer') router.push('/dashboard/user');
        else if (role === 'admin') router.push('/admin'); // Assuming admin dashboard exists or redirects

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("busConnectUser");
        router.push('/login');
    };

    // Admin Features
    const getPendingOwners = () => {
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        return users.filter(u => u.role === 'owner' && u.status === 'pending');
    };

    const approveOwner = (id) => {
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index].status = 'active';
            localStorage.setItem("bus_users", JSON.stringify(users));
            return true;
        }
        return false;
    };

    const rejectOwner = (id) => {
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            // Either remove or set status to rejected
            users.splice(index, 1); // Removing for simplicity or could set status='rejected'
            localStorage.setItem("bus_users", JSON.stringify(users));
            return true;
        }
        return false;
    };

    // Request Management (Mock)
    const createRequest = (requestData) => {
        const requests = JSON.parse(localStorage.getItem("bus_requests") || "[]");
        const newRequest = {
            id: Date.now(),
            userId: user.id,
            status: 'requested', // requested | quoted | booked | declined
            timestamp: new Date().toISOString(),
            ...requestData
        };
        requests.push(newRequest);
        localStorage.setItem("bus_requests", JSON.stringify(requests));
        return { success: true, request: newRequest };
    };

    const getUserRequests = () => {
        if (!user) return [];
        const requests = JSON.parse(localStorage.getItem("bus_requests") || "[]");
        return requests.filter(r => r.userId === user.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    const payAdvance = (requestId, couponCode = "") => {
        const requests = JSON.parse(localStorage.getItem("bus_requests") || "[]");
        const index = requests.findIndex(r => r.id === requestId);

        if (index !== -1) {
            // Check for double booking (Mock COOLDOWN Logic)
            const targetRequest = requests[index];
            const isBooked = requests.some(r =>
                r.busId === targetRequest.busId &&
                r.status === 'booked' &&
                r.startDate === targetRequest.startDate
            );

            if (isBooked) {
                return { success: false, message: "This bus was just booked by another user." };
            }

            let discountApplied = false;

            // Handle Coupon Application
            if (couponCode) {
                const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
                const userIndex = users.findIndex(u => u.id === user.id);

                if (userIndex !== -1) {
                    const currentUser = users[userIndex];
                    const couponIndex = currentUser.coupons?.findIndex(c => c.code === couponCode && !c.used);

                    if (couponIndex !== -1 && couponIndex !== undefined) {
                        currentUser.coupons[couponIndex].used = true;
                        discountApplied = true;

                        localStorage.setItem("bus_users", JSON.stringify(users));
                        setUser(currentUser);
                        localStorage.setItem("busConnectUser", JSON.stringify(currentUser));
                    } else {
                        return { success: false, message: "Invalid or already used coupon code." };
                    }
                }
            }

            requests[index].status = 'booked';
            requests[index].paymentStatus = 'paid';
            requests[index].discountApplied = discountApplied;
            localStorage.setItem("bus_requests", JSON.stringify(requests));
            return { success: true };
        }
        return { success: false, message: "Request not found" };
    };

    const completeTrip = (requestId) => {
        if (!user) return { success: false, message: "Not logged in" };

        const requests = JSON.parse(localStorage.getItem("bus_requests") || "[]");
        const reqIndex = requests.findIndex(r => r.id === requestId);

        if (reqIndex === -1) return { success: false, message: "Request not found" };
        if (requests[reqIndex].status !== 'booked') return { success: false, message: "Only booked trips can be completed" };

        // Mark request as completed
        requests[reqIndex].status = 'completed';
        localStorage.setItem("bus_requests", JSON.stringify(requests));

        // Update User Credits
        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const userIndex = users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            const currentUser = users[userIndex];
            currentUser.credits = (currentUser.credits || 0) + 2;

            let couponGenerated = false;

            // Generate Coupon if 10 or more credits
            if (currentUser.credits >= 10) {
                currentUser.credits -= 10;
                currentUser.coupons = currentUser.coupons || [];
                currentUser.coupons.push({
                    code: `SAVE10-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                    discount: 10,
                    type: 'percentage',
                    used: false,
                    generatedAt: new Date().toISOString()
                });
                couponGenerated = true;
            }

            localStorage.setItem("bus_users", JSON.stringify(users));
            setUser(currentUser);
            localStorage.setItem("busConnectUser", JSON.stringify(currentUser));

            return { success: true, couponGenerated, credits: currentUser.credits };
        }

        return { success: false, message: "User not found" };
    };

    const changePassword = (currentPassword, newPassword) => {
        if (!user) return { success: false, message: "No active session" };

        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const userIndex = users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            if (users[userIndex].password !== currentPassword) {
                return { success: false, message: "Incorrect current password" };
            }

            users[userIndex].password = newPassword;
            localStorage.setItem("bus_users", JSON.stringify(users));

            // Update session data
            const updatedUser = { ...user, password: newPassword };
            setUser(updatedUser);
            localStorage.setItem("busConnectUser", JSON.stringify(updatedUser));

            return { success: true };
        }
        return { success: false, message: "User not found" };
    };

    const updateUser = (updatedData) => {
        if (!user) return { success: false, message: "No active session" };

        const users = JSON.parse(localStorage.getItem("bus_users") || "[]");
        const index = users.findIndex(u => u.id === user.id);

        if (index !== -1) {
            const updatedUser = { ...users[index], ...updatedData };
            users[index] = updatedUser;

            // Save to DB
            localStorage.setItem("bus_users", JSON.stringify(users));

            // Update Session
            setUser(updatedUser);
            localStorage.setItem("busConnectUser", JSON.stringify(updatedUser));

            return { success: true };
        }
        return { success: false, message: "User not found" };
    };

    return (
        <AuthContext.Provider value={{ user, isAuthLoaded, login, logout, signup, getPendingOwners, approveOwner, rejectOwner, createRequest, getUserRequests, payAdvance, completeTrip, updateUser, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
