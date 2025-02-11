import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
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
            plan: "",
        };
    const [formData, setSelectedNote] = useState<IPrescription>(initialFormData);
    const dispatch = useDispatch();
    const [form, setSelectedPrescription] = useState<IPrescription | null>(null);
    const componentRef = useRef<HTMLDivElement>(null)
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false); 
    
    const handleAddNew = () => {
        setOpenViewModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setSelectedPrescription({ ...formData, [name]: value });
        };

    const handlePrint = useReactToPrint({
        documentTitle: "Prescription_PDF",
        onAfterPrint: () => console.log("Printed successfully!"),
    });

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
                <Typography variant="h5" gutterBottom>Prescription</Typography>
                <Button variant="contained" color="primary" onClick={handleAddNew}>Add new</Button>
            </div>

            <Modal open={openViewModal} onClose={handleCloseModal}>
                <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                    <div className="p-2 flex justify-between items-center">          
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div ref={componentRef}>
                        <Card className="p-2">
                            <CardContent>
                                <TextField
                                    name="plan"
                                    label="Plan"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    value={formData.plan}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Box className="flex justify-between px-16 sticky bottom-0">
                        <Button variant="contained" color="primary">Save</Button>
                        <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                handlePrint(); 
              }}
            >
              Export as pdf
            </Button> 
                    </Box>  
                </Box>
            </Modal>
            
            
        </div>
    );
};

export default Documents;