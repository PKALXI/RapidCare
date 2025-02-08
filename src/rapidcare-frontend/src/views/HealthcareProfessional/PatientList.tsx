import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, Container, Modal, Box } from "@mui/material";
import { IPatient } from "../../models/model";
import {patientCollection } from "../../firebaseControllers/DatabaseOps";
import AddPatient from "./AddMyPatient";
import { onSnapshot } from "firebase/firestore";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const PatientList = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    // const patients = healthcareProfessional?.patients;
    const [patients, setPatients] = useState<IPatient[]>([]);

    const closeModal = () =>{
        setOpen(false);
    }

    //https://firebase.google.com/docs/firestore/query-data/listen
    const unsub = onSnapshot(patientCollection, (querySnapshot) => {
        const patientList: IPatient[] = querySnapshot.docs.map((doc) => doc.data());
        setPatients(patientList);
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Container className="flex-grow p-6">
                <Typography variant="h5" gutterBottom>
                    Patient Records
                </Typography>
                <Card className="mb-4 p-2">
                    <Grid container spacing={2} className="text-center">
                        <Grid item xs={12} sm={1} md={1}><Typography fontWeight="bold">File No.</Typography></Grid>
                        <Grid item xs={12} sm={2} md={2}><Typography fontWeight="bold">Name</Typography></Grid>
                        <Grid item xs={12} sm={1} md={1}><Typography fontWeight="bold">Age</Typography></Grid>
                        <Grid item xs={12} sm={3} md={3}><Typography fontWeight="bold">Email</Typography></Grid>
                        <Grid item xs={12} sm={2} md={2}><Typography fontWeight="bold">Phone</Typography></Grid>
                        <Grid item xs={12} sm={2} md={3}><Typography fontWeight="bold">Actions</Typography></Grid>
                    </Grid>
                </Card>
                {patients?.map((patient) => (
                    <Card key={patient.id} className="mb-3 p-3">
                        <CardContent>
                            <Grid container spacing={2} className="text-center">
                                <Grid item xs={12} sm={1} md={1}><Typography>{patient.id}</Typography></Grid>
                                <Grid item xs={12} sm={2} md={2}><Typography>{patient.profileInformation?.demographics?.name}</Typography></Grid>
                                <Grid item xs={12} sm={1} md={1}><Typography>{patient.profileInformation?.demographics?.age}</Typography></Grid>
                                <Grid item xs={12} sm={3} md={3}><Typography>{patient.profileInformation?.contactInformation?.email}</Typography></Grid>
                                <Grid item xs={12} sm={2} md={2}><Typography>{patient.profileInformation?.contactInformation?.phone}</Typography></Grid>
                                <Grid item xs={12} sm={2} md={3}>
                                    <Button variant="contained" color="primary" onClick={() => navigate(`/patient/${patient.id}`)}>View Record</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}

            <div className="flex justify-center my-6">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    <AddCircleIcon/>
                    ADD PATIENT
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                        <AddPatient closeModal={closeModal}/>
                    </Box>
                </Modal>
            </div>
                
            </Container>

            <Footer />
        </div>
    );
};

export default PatientList;
