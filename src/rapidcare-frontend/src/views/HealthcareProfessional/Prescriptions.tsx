import React, { useState, useRef } from "react";
//import { useReactToPrint } from "react-to-print";
import { IPatient, IDocument, IPrescription } from "../../models/model";
import { Card, CardContent, Typography, Modal, Box, IconButton, Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addDocument } from "../../redux/appActions";
import { doc } from "firebase/firestore";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'; // Import pdf-lib
import { saveAs } from 'file-saver';

interface PrescriptionsProps {
    patient: IPatient;
}

const Prescription: React.FC<PrescriptionsProps> = ({ patient }) => {

    const initialFormData: IPrescription = {
            plan: "",
        };
    const [formData, setSelectedNote] = useState({
        plan:"",
    });
    const dispatch = useDispatch();
    const [form, setSelectedPrescription] = useState<IPrescription | null>(null);
    const componentRef = useRef<HTMLDivElement>(null)
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false); 
    
    const handleAddNew = () => {
        setOpenViewModal(true);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

        const generatePdf = async () => {
            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage();
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
                const prescriptionText = formData.plan;
    
                page.setFont(font);
                const fontSize = 12;
                const lines = prescriptionText.split('\n');
                let yPos = 700;
    
                for (const line of lines) {
                  page.drawText(line, {
                    x: 50,
                    y: yPos,
                    font,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                  });
                  yPos -= fontSize + 5;
                }
    
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        
                saveAs(blob, 'prescription.pdf');
    
            } catch (error) {
                console.error("Error generating PDF:", error);
            }
        }

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
                            onClick={(generatePdf)}
                            >
                            Export as pdf
                            </Button> 
                    </Box>  
                </Box>
            </Modal>
            
            
        </div>
    );
};

export default Prescription