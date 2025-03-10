import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Footer from "../components/AppFooter";
import Navbar from "../components/AppNavBar";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/appActions";
import { Card, CardContent, Typography, Button, Container } from "@mui/material";
import toast from 'react-hot-toast';

const AccountSettings = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            dispatch(resetState());
            toast.success('Logged out successfully');
            navigate("/login");
        } catch (error) {
            toast.error('Failed to logout');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Container className="flex-grow pt-6 pb-16">
                <Typography variant="h5" gutterBottom>
                    Account Settings
                </Typography>
                <Card className="mb-4 p-2">
                    <CardContent>
                        <Typography variant="h6">
                            Personal Information
                        </Typography>
                        <div className="mt-4 space-y-2">
                            <Typography variant="body1">
                                <strong>Name:</strong> {healthcareProfessional?.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {healthcareProfessional?.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {healthcareProfessional?.phone}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hospital:</strong> {healthcareProfessional?.hospital}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Department:</strong> {healthcareProfessional?.department}
                            </Typography>
                        </div>

                        <div className="flex justify-center mt-6 gap-4">
                            <Button variant="contained" color="primary">Edit Information</Button>
                            <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                        </div>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </div>
    );
};

export default AccountSettings;
