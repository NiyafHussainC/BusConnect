"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Initialize Mock Database if empty
    useEffect(() => {
        const users = localStorage.getItem("bus_users");
        if (!users) {
            localStorage.setItem("bus_users", JSON.stringify([
                // Default Admin
                { id: 1, email: "admin@bustrack.com", password: "admin", role: "admin", name: "Super Admin", status: "active" },
                // Demo Customer
                { id: 2, email: "customer@demo.com", password: "user123", role: "customer", name: "Demo User", status: "active" }
            ]));
        }
    }, []);

    // Load active session
    useEffect(() => {
        const storedUser = localStorage.getItem("busConnectUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
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
            joined: new Date().toISOString() // for admin view
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

    const payAdvance = (requestId) => {
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

            requests[index].status = 'booked';
            requests[index].paymentStatus = 'paid';
            localStorage.setItem("bus_requests", JSON.stringify(requests));
            return { success: true };
        }
        return { success: false, message: "Request not found" };
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
        <AuthContext.Provider value={{ user, login, logout, signup, getPendingOwners, approveOwner, rejectOwner, createRequest, getUserRequests, payAdvance, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
