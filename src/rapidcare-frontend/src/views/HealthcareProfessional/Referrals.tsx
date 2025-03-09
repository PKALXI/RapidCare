import React, { useState } from "react";
import { IPatient, IDocument } from "../../models/model";
import { Card, CardContent, CardHeader, Grid, Button, Typography, Modal, Box, IconButton, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PDFDocument } from "pdf-lib";
import { toast } from "react-hot-toast";
//import { v4 as uuidv4 } from "uuid";

interface ReferralsProps {
    patient: IPatient;
}

const Referrals: React.FC<ReferralsProps> = ({ patient }) => {
    const referrals = patient.referrals || [];
    const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);
    const [openAddModal, setAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [pdfData, setPdfData] = useState<string | null>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);

    const loadPDF = async (type: string): Promise<void> => {
        let pdfUrl = "";
        if (type === "blood-test") pdfUrl = `${process.env.PUBLIC_URL}/bloodWork.pdf`;
        if (type === "ultrasound") pdfUrl = `${process.env.PUBLIC_URL}/pdfFormExample.pdf`;

        try {
            const response = await fetch(pdfUrl);
            const pdfBytes = await response.arrayBuffer();
            const loadedPdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

            // Fill form fields if needed
            const form = loadedPdf.getForm();
            // form.getTextField("fieldName").setText("value");

            const filledPdfBytes = await loadedPdf.save();

            setPdfDoc(loadedPdf);
            setPdfData(URL.createObjectURL(new Blob([filledPdfBytes], { type: "application/pdf" })));
        } catch (error) {
            console.error("Error loading PDF:", error);
            toast.error("Failed to load PDF form");
        }
    };

    const handleTypeChange = (event: SelectChangeEvent): void => {
        const type = event.target.value;
        setSelectedType(type);
        loadPDF(type);
    };

    const handleSave = async (): Promise<void> => {
        if (!pdfDoc || !pdfData) {
            toast.error("No PDF to save");
            return;
        }

        try {
            const form = pdfDoc.getForm();
            form.flatten();
            const finalPdfBytes = await pdfDoc.save();
            // const newDocument: IDocument = {
            //     documentId: uuidv4(),
            //     name: `${selectedType}-requisition.pdf`,
            //     type: "pdf",
            //     url: URL.createObjectURL(new Blob([finalPdfBytes], { type: "application/pdf" }))
            // };
            // Update patient's referrals in backend
            toast.success("Referral saved successfully");
            setAddModal(false);
        } catch (error) {
            console.error("Error saving PDF:", error);
            toast.error("Failed to save referral");
        }
    };

    const handleAddNew = (): void => {
        setAddModal(true);
    };

    const handleOpenDocument = (document: IDocument): void => {
        setSelectedDocument(document);
        setOpenViewModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenViewModal(false);
        setSelectedDocument(null);
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

export default Referrals;