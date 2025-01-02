import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SignupFormProps {
    formData: {
        username: string;
        password: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ formData, handleChange, handleSubmit }) => {
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Continue
            </Button>
        </Box>
    );
};

export default SignupForm;