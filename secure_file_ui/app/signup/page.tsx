"use client";
import { useState } from "react";
import SignupForm from './SignupForm';
import { Typography, Alert } from "@mui/material";
import { useUserRepository } from "@/hooks/user.repository";
import { useRouter } from 'next/navigation';
import ROUTES from "@/constants/routes";

const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name) && name.length <= 30;
};

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username) && username.length <= 30;
};

const validatePassword = (password: string) => {
    // Password should be at least 8 characters long and contain at least one alphabet and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);

    const userRepository = useUserRepository();
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const { firstName, lastName, email, username, password, confirmPassword } = formData;

        if (!validateName(firstName)) {
            setError("First name should only contain alphabets and should not exceed 30 characters.");
            return false;
        }

        if (!validateName(lastName)) {
            setError("Last name should only contain alphabets and should not exceed 30 characters.");
            return false;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (!validateUsername(username)) {
            setError("Username should only contain alphanumeric characters and underscores, and should not exceed 30 characters.");
            return false;
        }

        if (!validatePassword(password)) {
            setError("Password should be at least 8 characters long and contain at least one alphabet and one number.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        setError(null); // Clear error if validation passes
        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateForm()) return;

        // Handle form submission logic here
        try {
            const res = await userRepository.signup(formData);
            console.log(res);
        } catch (error: any) {
            setError(error?.message ?? "Failed to signup");
            return;
        }
        router.push(ROUTES.SIGNUP_SUCCESS);
    };

    return (
       <>
            <Typography variant="h3" gutterBottom>Sign Up</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
            <SignupForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    );
}