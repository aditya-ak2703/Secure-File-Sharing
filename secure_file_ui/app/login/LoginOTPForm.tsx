import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import styles from './LoginOTPForm.module.css';

interface SignupFormProps {
    formData: {
        otp: string
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ formData, handleChange, handleSubmit }) => {
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">An OTP have been send to your registered email. Enter OTP. </Typography>
            <TextField
                slotProps={{htmlInput: {className: styles['.cus-number-input']}}}
                label="OTP"
                name="otp"
                type='number'
                value={formData.otp}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </Box>
    );
};

export default SignupForm;