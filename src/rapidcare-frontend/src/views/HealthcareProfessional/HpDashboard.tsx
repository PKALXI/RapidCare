import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { Card, CardContent, Typography, Button, Container } from "@mui/material";


const HpDashboard = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const dashboardMetrics = healthcareProfessional?.dashboardMetrics;
    const consultations = healthcareProfessional?.consultations;

    return (

        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-gray-100">
                <h2 className="text-3xl font-semibold mb-6 ml-4">Hello {healthcareProfessional?.name}!</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className=" bg-gradient-to-r from-blue-200 to-blue-400 text-black rounded-lg shadow-sm p-6">
                        <h3 className="text-2xl mb-4 ml-6">Scheduled Visits for Today</h3>
                        <p className="text-6xl font-bold mb-4 ml-6">{dashboardMetrics?.scheduledVisitsToday}</p>
                        <div className="flex mt-6 ml-6 mb-4">
                            <div className="rounded-lg bg-blue-100 p-6 mr-12">
                                <h4 className="text-lg font-bold">New Patients This Month</h4>
                                <div className="p-4">
                                    <p className="text-2xl font-bold">{dashboardMetrics?.newPatientsThisMonth}</p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-6">
                                <h4 className="text-lg font-bold">Total Patients</h4>
                                <div className="p-4">
                                    <p className="text-2xl font-bold">{dashboardMetrics?.totalPatients}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white md:col-span-1 rounded-lg shadow-lg p-6 ">
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
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HpDashboard;