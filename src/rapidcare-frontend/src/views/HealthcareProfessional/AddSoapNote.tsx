import React, { useState } from 'react';
import { Card, CardContent, Typography, Modal, Box, IconButton, Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { ISoapNote } from '../../models/model';
import { v4 as uuidv4 } from "uuid";  // Importing uuidv4

interface AddSoapNoteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientId: string;
}

const AddSoapNote: React.FC<AddSoapNoteProps> = ({ open, setOpen, patientId }) => {
    const initialFormData: ISoapNote = {
        id: "",
        date: "",
        practioner: "",
        subjective: {
          reason: "",
          hpi: "",
          medicalHistory: "",
          symptoms: "",
          allergies: "",
          currentMedications: ""
        },
        objective: {
          vitals: "",
          physicalExam: "",
          laboratoryData: "",
          imagingResults: "",
          otherData: ""
        },
        assessment: {
          problems: "",
          diagnosis: ""
        },
        plan: "",
        followUp: ""    
    };
    const [formData, setNote] = useState<ISoapNote>(initialFormData);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNote({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Save in Firestore
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] flex flex-col">
                <Box className="flex justify-between items-center p-2">
                    <Typography variant="h6">New SOAP Note</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box className="overflow-y-auto flex-grow max-h-[70vh] p-2 space-y-2">
                    <Card className="p-2">
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField 
                                        name="date"
                                        label="Date" 
                                        fullWidth
                                        value={formData.date}
                                        onChange={handleChange}
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
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

                    <Card className="p-2">
                        <Typography variant="h6" gutterBottom>Subjective</Typography>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><TextField name="reason" fullWidth label="Reason for visit" value={formData.subjective.reason} onChange={handleChange} /></Grid>
                                <Grid item xs={12}><TextField name="hpi" fullWidth label="History of Presenting Illness" value={formData.subjective.hpi} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="medicalHistory" fullWidth label="Past Medical History" multiline rows={3} value={formData.subjective.medicalHistory} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="symptoms" fullWidth label="Review of Systems" multiline rows={3} value={formData.subjective.symptoms} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="allergies" fullWidth label="Allergies" multiline rows={3} value={formData.subjective.allergies} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="currentMedications" fullWidth label="Current Medications" multiline rows={3} value={formData.subjective.currentMedications} onChange={handleChange} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card className="p-2">
                        <Typography variant="h6" gutterBottom>Objective</Typography>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}><TextField name="vitals" fullWidth label="Vital Signs" multiline rows={3} value={formData.objective.vitals} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="physicalExam" fullWidth label="Physical Exam" multiline rows={3} value={formData.objective.physicalExam} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="laboratoryData" fullWidth label="Laboratory Data" multiline rows={3} value={formData.objective.laboratoryData} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="imagingResults" fullWidth label="Imaging Results" multiline rows={3} value={formData.objective.imagingResults} onChange={handleChange} /></Grid>
                                <Grid item xs={12}><TextField name="otherData" fullWidth label="Other Data" multiline rows={3} value={formData.objective.otherData} onChange={handleChange} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card className="p-2">
                        <Typography variant="h6" gutterBottom>Assessment</Typography>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}><TextField name="problems" fullWidth label="Problems Identified" multiline rows={3} value={formData.assessment.problems} onChange={handleChange} /></Grid>
                                <Grid item xs={6}><TextField name="diagnosis" fullWidth label="Diagnosis" multiline rows={3} value={formData.assessment.diagnosis} onChange={handleChange} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card className="p-2">
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><TextField name="plan" fullWidth label="Plan" multiline rows={3} value={formData.plan} onChange={handleChange} /></Grid>
                                <Grid item xs={12}><TextField name="followUp" fullWidth label="Follow-up" multiline rows={3} value={formData.followUp} onChange={handleChange} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>

                <Box className="flex justify-between px-16 sticky bottom-0">
                    <Button variant="contained" color="primary">Start Recording</Button>
                    <Button variant="contained" color="primary">Save</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddSoapNote;
