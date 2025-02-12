import { useState } from "react";
import { TextField, Button, MenuItem, InputAdornment, IconButton, Card, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateField } from "../helpers/helper";
import { generateSignupStateData } from "../mockData/mockData";
import { setLoginState } from "../redux/appActions";

export default function Signup() {
    const initialFormData = {
        name: "",
        email: "",
        role: "admin",
        password: "",
        confirmPassword: "",
        showPassword: false,
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<any>({});

    const validation = (name:string, value: string | boolean) => {
        if (name === "email") {
            return validateField(name, value);
        } 
        if (name === "confirmPassword" && value !== formData.password) {
            return "Passwords do not match";
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const errormessage = validation(name, value);
        setErrors({ ...errors, [name]: errormessage });
    };

    const handleTogglePassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (Object.values(errors).some(error => error)) {return;}

        // Mock API call
        const mockData = generateSignupStateData();
        if (mockData.isAuthenticated) {
            dispatch(setLoginState(true, true));
            navigate("/home");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="p-4 w-96 text-center space-y-4">
                <Typography variant="h4">RapidCare</Typography>
                <Typography variant="h5">Create New Account</Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={formData.showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword}>
                                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </Card>
        </div>
    );
}
