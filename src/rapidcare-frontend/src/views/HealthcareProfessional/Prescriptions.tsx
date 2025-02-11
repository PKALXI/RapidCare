import React, { useState } from "react";
import { IPatient, IDocument, IPrescription } from "../../models/model";
import { Card, CardContent, Typography, Modal, Box, IconButton, Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addDocument } from "../../redux/appActions";
import { doc } from "firebase/firestore";

interface PrescriptionsProps {
    patient: IPatient;
}

const Documents: React.FC<PrescriptionsProps> = ({ patient }) => {

    const initialFormData: IPrescription = {
            doctorName: "",
            practioner: "",
            date: "",
            type: "",
            url: "",
            prescriptedMedication: {
                medication: "",
                dosage: "",
                duration: "",
                qty: 0,
            }
        };

    const [formData, setSelectedNote] = useState<IPrescription>(initialFormData);
    const dispatch = useDispatch();
    const prescriptions = patient.prescriptions || [];
    const [selectedPrescription, setSelectedPrescription] = useState<IPrescription | null>(null);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false); 
    
    const handleAddNew = () => {
        setOpenViewModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setSelectedPrescription({ ...formData, [name]: value });
        };


    //Need to change


    const handleOpenPrescription = (prescriptions: IPrescription) => {
        setSelectedPrescription(prescriptions);
        setOpenViewModal(true);
    };

    const handleCloseModal = () => {
        setOpenViewModal(false);
        setSelectedPrescription(null);
    };

    return (
        <div>
            <div className="flex justify-between">
                <Typography variant="h5" gutterBottom>Prescriptions</Typography>
                <Button variant="contained" color="primary" onClick={handleAddNew}>Add new</Button>
            </div>

            <Modal open={openViewModal} onClose={handleCloseModal}>
                <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                    <div className="p-2 flex justify-between items-center">
                        <Typography variant="h6">New Prescription{selectedPrescription?.practioner}</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Card className="p-2">
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField 
                                        name="Doctor's Name"
                                        label="Doctor's Name" 
                                        fullWidth
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        type="doctorName"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        name="practioner"
                                        label="Practitioner" 
                                        fullWidth
                                        value={formData.practioner}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    
                </Box>
            </Modal>

            
            <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
                <Box className="w-1/3 mx-auto mt-64 bg-white p-4 rounded relative">
                    <div className="p-4 flex justify-between items-center">
                        <Typography variant="h6">Upload New Document</Typography>
                        <IconButton onClick={() => setOpenUploadModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    
                </Box>
            </Modal>
        </div>
    );
};

export default Documents;