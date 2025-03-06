import React, { useState, useEffect } from "react";
import { IPatient, IDocument } from "../../models/model";
import { Card, CardContent, CardHeader, Grid, Button, Typography, Modal, Box, IconButton, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import { PDFDocument } from "pdf-lib";
// import { saveAs } from 'file-saver';

interface ReferralsProps {
    patient: IPatient;
}

const Referrals: React.FC<ReferralsProps> = ({ patient })=> {
    const dispatch = useDispatch();
    const referrals = patient.referrals || [];
    const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);
    const [openAddModal, setAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false); 

    const [selectedType, setSelectedType] = useState<string>("");
    const [pdfData, setPdfData] = useState<string | null>(null);

    const handleAddNew = () => {
        setAddModal(true);
    };

    const handleOpenDocument = (document: IDocument) => {
        setSelectedDocument(document);
        setOpenViewModal(true);
    };

    const handleCloseModal = () => {
        setOpenViewModal(false);
        setSelectedDocument(null);
    };

    //https://pdf-lib.js.org/
    const handleTypeChange = async (event: SelectChangeEvent<string>) => {
        const type = event.target.value;
        setSelectedType(type);
    
        let pdfUrl = "";
        if (type === "blood-test") pdfUrl = process.env.PUBLIC_URL + "/bloodWork.pdf";
        if (type === "ultrasound") pdfUrl = process.env.PUBLIC_URL + "/pdfFormExample.pdf";
    
        if (pdfUrl) {
            try {
                const response = await fetch(pdfUrl);
                const pdfBytes = await response.arrayBuffer();
                const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
                console.log("PDF loaded successfully");
    
                const form = pdfDoc.getForm();
                if (!form) {
                    console.error("PDF does not contain a form.");
                    return;
                }
    
                console.log("Filling PDF form...");
                //form.getTextField("Given Name").setText(patient.profileInformation?.demographics?.name || "");
                //form.getTextField("Date").setText(new Date().toLocaleDateString());
                //form.getTextField("Country").setText("Canada");
    
                const filledPdfBytes = await pdfDoc.save();
                setPdfData(URL.createObjectURL(new Blob([filledPdfBytes], { type: "application/pdf" })));
    
                console.log("PDF processed and ready to display.");
            } catch (error) {
                console.error("Error processing PDF:", error);
            }
        }
    };

    const handleSave = async () => {
        if (!pdfData) return;
        try {
            const response = await fetch(pdfData);
            const pdfBytes = await response.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
            const form = pdfDoc.getForm();
            if (!form) {
                console.error("PDF does not contain a form.");
                alert("This PDF cannot be edited because it has no form.");
                return;
            }
            form.flatten();
            const updatedPdfBytes = await pdfDoc.save();
            const blob = new Blob([updatedPdfBytes], { type: "application/pdf" });
            const updatedPdfUrl = URL.createObjectURL(blob);
    
            const newDocument: IDocument = {
                documentId: new Date().getTime().toString(),
                name: `${selectedType}-requisition.pdf`,
                type: "pdf",
                url: updatedPdfUrl,
            };

            // dispatch(addrequisition(newDocument));
            /saveAs(blob, newDocument.name);
            setAddModal(false);

        } catch (error) {
            console.error("Error saving PDF:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <Typography variant="h5" gutterBottom>Referrals</Typography>
                <Button variant="contained" color="primary" onClick={handleAddNew}>Add new</Button>
            </div>
            <Grid container spacing={2}>
                {referrals.map((doc) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.documentId}>
                        <Card className="cursor-pointer" onClick={() => handleOpenDocument(doc)}>
                            <CardHeader title={doc.name} />
                            <CardContent>
                                <Typography variant="body2">{doc.type.includes("image") ? "Image" : "PDF"} Document</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={openViewModal} onClose={handleCloseModal}>
                <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] overflow-y-auto">
                    <div className="p-2 flex justify-between items-center">
                        <Typography variant="h6">{selectedDocument?.name}</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {selectedDocument && (
                        selectedDocument.type.includes("image") ? (
                            <img src={selectedDocument.url} alt={selectedDocument.name} className="w-full h-auto" />
                        ) : (
                            <embed src={selectedDocument.url} width="100%" height="500px" />
                        )
                    )}
                </Box>
            </Modal>
            
            <Modal open={openAddModal} onClose={() => setAddModal(false)}>
                <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] overflow-y-auto">
                    <div className="p-2 flex justify-between items-center">
                        <Typography variant="h6">Add New Referral</Typography>
                        <IconButton onClick={() => setAddModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Select fullWidth value={selectedType} onChange={handleTypeChange} displayEmpty>
                        <MenuItem value="" disabled>Select Referral Type</MenuItem>
                        <MenuItem value="blood-test">Blood Test</MenuItem>
                        <MenuItem value="ultrasound">Ultrasound</MenuItem>
                    </Select>
                    {pdfData && (
                        <div className="mt-4">
                            <embed src={pdfData} width="100%" height="400px" />
                        </div>
                    )}
                    <div className="mt-4 flex justify-center space-x-2">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>  
                </Box>
            </Modal>
        </div>
    );
};

export default Referrals