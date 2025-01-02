import * as apiEndpoints from "@/constants/api-endpoints";
import { UserSaveRequest } from "@/models/user";
import { use, useCallback } from "react";

export function useUserRepository() {

    const signup = useCallback(async function signup(user: UserSaveRequest) {
        const response = await fetch(apiEndpoints.getSignupEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to signup');
        }

        return response.json();

    }, []);

    const generateOTP = useCallback(async function generateOTP(username: string, password: string) {
        const response = await fetch(apiEndpoints.getOTPGenerationEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Failed to generate OTP');
        }

        return response.json();
    }, []);

    const login = useCallback(async function login(username: string, password: string, otp: string) {
        const response = await fetch(apiEndpoints.getLoginEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, otp})
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        return response.json();
    }, []);

    const getLoggedInUser = useCallback(async function getLoggedInUser() {
        const response = await fetch(apiEndpoints.getLoggedInUserEndpoint(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get logged in user');
        }

        return response.json();
    }, []);

    return {signup, generateOTP, login, getLoggedInUser};
}