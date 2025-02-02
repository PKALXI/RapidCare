import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Box, Typography, Avatar, Divider, Tabs,  Tab, Grid } from "@mui/material";
import { useState } from "react";
import { deletePatient } from "../../redux/appActions";
import { useDispatch } from "react-redux";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import MedicalHistory from "./MedicalHistory";
import ProfileInformation from "./ProfileInformation";
import ConsultationNotes from "./ConsultationNotes";
import Documents from "./Documents";
import DataRow from "../components/DataRow";
import PersonIcon from '@mui/icons-material/Person';

const PatientProfile = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const patient = healthcareProfessional?.patients?.find((p) => p.id === patientId);
    const [activeTab, setActiveTab] = useState("Profile Information");

    if (!patient) {
        return <div>Patient not found</div>;
    }

    const handleCloseProfile = () => {
        navigate("/patients");
    };

    const handleDeleteProfile = () => {
        dispatch(deletePatient(patient.id));
        navigate("/patients");
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <Box className="flex flex-col flex-grow">
                <Box className="flex justify-between mt-6 mb-2 px-32">
                    <Box className="flex justify-center">
                        <Avatar sx={{ width: 100, height: 100 }} >
                            <PersonIcon sx={{ fontSize: 50 }}  />
                        </Avatar>
                    </Box>
                    <Box className="flex flex-col justify-center">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={3}>
                                <DataRow label="Name" value={patient.profileInformation?.demographics?.name} />
                                <DataRow label="Gender" value={patient.profileInformation?.demographics?.gender} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={3}>
                                    <DataRow label="Age" value={patient.profileInformation?.demographics?.age} />
                                    <DataRow label="Marital Status" value={patient.profileInformation?.demographics?.maritalStatus} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={3}>
                                    <DataRow label="Height" value={`${patient.profileInformation?.demographics?.height} cm`} />
                                    <DataRow label="Weight" value={`${patient.profileInformation?.demographics?.weight} lbs`} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className="flex flex-col justify-center space-y-2">
                        <Button variant="contained" color="primary" onClick={handleCloseProfile}>Close Profile</Button>
                        <Button variant="contained" color="error" onClick={handleDeleteProfile}>Delete Profile</Button>
                    </Box>
                </Box>
                <Divider />

                <Box className="flex flex-grow">
                    <Box className="w-1/4 bg-blue-50 p-4 rounded">
                        <Typography variant="h6" className="text-center mb-4">Navigation</Typography>
                        <Tabs orientation="vertical" value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
                            <Tab label="Profile Information" value="Profile Information" />
                            <Tab label="Medical History" value="Medical History" />
                            <Tab label="Consultation Notes" value="Consultation Notes" />
                            <Tab label="Documents" value="Documents" />
                        </Tabs>
                    </Box>

                    <Box className="w-3/4 p-4 overflow-auto max-h-[calc(100vh-150px)]">
                        {activeTab === "Profile Information" && <ProfileInformation patient={patient} />}
                        {activeTab === "Medical History" && <MedicalHistory patient={patient} />}
                        {activeTab === "Consultation Notes" && <ConsultationNotes patient={patient} />}
                        {activeTab === "Documents" && <Documents patient={patient} />}
                    </Box>
                </Box>
            </Box>
            <Footer/>
        </div>
    );
};

export default PatientProfile;