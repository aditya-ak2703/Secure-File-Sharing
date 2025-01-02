"use client";
import { useState } from "react";
import { Typography, Alert } from "@mui/material";
import { useUserRepository } from "@/hooks/user.repository";
import { useRouter } from 'next/navigation';
import ROUTES from "@/constants/routes";
import LoginPrimaryForm from './LoginPrimaryForm';
import LoginOTPForm from './LoginOTPForm';

const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username) && username.length <= 30;
};

const validateOTP = (otp: string) => {
    const otpRegex = /^[0-9_]+$/;
    return otpRegex.test(otp) && otp.length == 6;
};


export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        otp: '',
    });
    const [isOTPGenerated, setIsOTPGenerated] = useState(false);
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

    const validatePrimaryForm = () => {
        const { username } = formData;

        if (!validateUsername(username)) {
            setError("Username should only contain alphanumeric characters and underscores, and should not exceed 30 characters.");
            return false;
        }

        setError(null); // Clear error if validation passes
        return true;
    }

    const validateOTPForm = () => {
        const { otp } = formData;

        if (!validateOTP(otp)) {
            setError("OTP should be a 6-digit number.");
            return false;
        }

        setError(null); // Clear error if validation passes
        return true;
    }

    const handleOTPGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validatePrimaryForm()) return;

        // Handle form submission logic here
        try {
            const res = await userRepository.generateOTP(formData.username, formData.password);
            console.log(res);
        } catch (error: any) {
            setError(error?.message ?? "Failed to generate OTP");
            return;
        }
        setIsOTPGenerated(true);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateOTPForm()) return;

        // Handle form submission logic here
        try {
            const res = await userRepository.login(formData.username, formData.password, formData.otp);
            console.log(res);
        } catch (error: any) {
            setError(error?.message ?? "Failed to Log In");
            return;
        }
    }

    return (
       <>
            <Typography variant="h3" gutterBottom>Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
            <div>
                { isOTPGenerated ? 
                    <LoginOTPForm formData={formData} handleChange={handleChange} handleSubmit={handleLogin} /> :
                    <LoginPrimaryForm formData={formData} handleChange={handleChange} handleSubmit={handleOTPGeneration} />
                }
            </div>
        </>
    );
}