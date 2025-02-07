import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { Card, CardContent, Typography, Button, Container } from "@mui/material";

const AppointmentsList = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const consultations = healthcareProfessional?.consultations;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Container className="flex-grow p-6 pb-16">
                <Typography variant="h5" gutterBottom>
                    Upcoming Appointments
                </Typography>

                {consultations?.map((consultation, index) => (
                    <Card key={index} className="mb-4 p-2">
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <Typography variant="h6">{consultation.patientName}</Typography>
                                <Typography variant="body2" color="text.secondary">{consultation.date}</Typography>
                            </div>
                            <div className="text-right">
                                <Typography variant="body1">{consultation.time}</Typography>
                                <Button variant="contained" color="primary">View Details</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <div className="flex justify-center mt-6">
                    <Button variant="contained" color="primary">Add New Appointment</Button>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default AppointmentsList;