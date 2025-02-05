import React, { useState } from "react";
import { IPatient, ISoapNote } from "../../models/model";
import { Card, CardContent, CardHeader, Typography, Modal, Box, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddSoapNote from "./AddSoapNote";
import { useNavigate } from "react-router-dom";

interface ConsultationNotesProps {
    patient: IPatient;
}

const ConsultationNotes: React.FC<ConsultationNotesProps> = ({ patient }) => {
    const consultationNotes = patient.consultationNotes || [];
    const [selectedNote, setSelectedNote] = useState<ISoapNote | null>(null);
    const [openNote, setOpenNote] = useState(false); 
    const [openSoapNote, setOpenSoapNote] = useState(false); 
    const navigate = useNavigate();

    
    const handleAddNew = () => {
        setOpenSoapNote(true);
        navigate("/SoapView");
    };

    const handleOpenNote = (note: ISoapNote) => {
        setSelectedNote(note);
        setOpenNote(true);
    };

    const handleCloseNote = () => {
        setOpenNote(false);
        setSelectedNote(null);
    };

    return (
        <div >
            <Box className="flex justify-between">
                <Typography variant="h5" gutterBottom>Consultation Notes</Typography>
                <Button variant="contained" color="primary" onClick={handleAddNew}>Add new</Button>
            </Box>

            <Grid container spacing={2}>
                {consultationNotes?.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                    <Card  className="cursor-pointer" onClick={() => handleOpenNote(note)}>
                        <CardHeader title={note.date} />
                        <CardContent>
                            <Typography variant="subtitle1">Reason: {note.reasonForVisit}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">Practitioner: {note.practioner}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <Modal open={openNote} onClose={handleCloseNote}>
                <Box className= "w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-2">
                        <Typography variant="h6"></Typography>
                        <IconButton onClick={handleCloseNote}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {selectedNote && (
                        <div className="space-y-2 p-2">
                            <div className="flex justify-between">
                                <Typography variant="body1"><strong>Date:</strong> {selectedNote.date}</Typography>
                                <Typography variant="body1"><strong>Practitioner:</strong> {selectedNote.practioner}</Typography>
                                <Typography variant="body1"><strong>Reason for Visit:</strong> {selectedNote.reasonForVisit}</Typography>
                            </div>
                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Subjective Assessment</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} md={3}><Typography variant="body2">Symptoms:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.subjectiveAssesment.symptoms || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2">Allergies:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.subjectiveAssesment.allergies || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2">Medications:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.subjectiveAssesment.medications || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2" >Medical History:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.subjectiveAssesment.medicalHistory || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2">Last Meal:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.subjectiveAssesment.lastMeal || "N/A"}</Typography></Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Objective Assessment</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} md={3}><Typography variant="body2" >Breathing:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.objectiveAssessment.breathing || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2" >Circulation:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.objectiveAssessment.circulation || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2" >Skin Type:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.objectiveAssessment.skinType || "N/A"}</Typography></Grid>

                                        <Grid item xs={4} md={3}><Typography variant="body2" >Head-to-Toe Check:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.objectiveAssessment.headToToeCheck || "N/A"}</Typography></Grid>
                                        
                                        <Grid item xs={4} md={3}><Typography variant="body2">Level of Consciousness:</Typography></Grid>
                                        <Grid item xs={8} md={9}><Typography variant="body2">{selectedNote.objectiveAssessment.levelOfConsciousness || "N/A"}</Typography></Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Assessment Summary</Typography>
                                    <Typography variant="body2">{selectedNote.summary || "N/A"}</Typography>
                                </CardContent>
                            </Card>

                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Plan</Typography>
                                    <Typography variant="body2">{selectedNote.plan || "N/A"}</Typography>
                                </CardContent>
                            </Card>  
                        </div>
                    )}
                </Box>
            </Modal>

            <AddSoapNote
                open={openSoapNote}
                setOpen={setOpenSoapNote}
                patientId={patient.id}
            />

            
        </div>
    );
};

export default ConsultationNotes;

 