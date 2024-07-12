import { editUserSchema } from '../schema/edit-user';
import {
    LoginRequest,
    RegisterRequest,
} from "../types/user";

const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(request: LoginRequest) {
    try {
        const res = await fetch(`${baseUrl}/api/auth/login/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Authentication failed");
    }
}

export async function register(request: RegisterRequest) {
    try {
        const res = await fetch(`${baseUrl}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        const response = await res.json();
        if (res.status !== 200) {
            throw new Error(response.errors);
        }
        return response;
    } catch (e) {
        throw new Error("Registration failed");
    }
}

export async function getMyProfile(token: string) {
    try {
        const res = await fetch(`${baseUrl}/api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await res.json();
        return response
    } catch (error) {
        throw new Error("Failed to get user");
    }
}

export async function getUsers(token: string) {
    try {
        const res = await fetch(`${baseUrl}/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await res.json();
        return response
    } catch (error) {
        throw new Error("Failed to get users");
    }
}

export async function getUser(token: string, id: string) {
    try {
        const res = await fetch(`${baseUrl}/api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Failed to get user");
    }
}

export async function addUser(token: string, data: any) {
    try {
        const res = await fetch(`${baseUrl}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Failed to post user");
    }
}

export async function updateUser(token: string, id: string, data: any) {
    try {
        const { email, ...rest } = data
        const res = await fetch(`${baseUrl}/api/users/profile/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(rest),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Failed to update user");
    }
}

export async function updateUserPassword(token: string, id: string, data: any) {
    try {
        const res = await fetch(`${baseUrl}/api/users/password/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Failed to update password user");
    }
}

export async function deleteUser(token: string, id: number) {
    try {
        const res = await fetch(`${baseUrl}/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await res.json();
        return response;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
}
