/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Display the SOAP notes and add 
 */

// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

import React, { useState } from "react";
import { IPatient, ISoapNote } from "../../models/model";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Modal,
  Box,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddSoapNote from "./AddSoapNote";

interface ConsultationNotesProps {
  patient: IPatient;
}

const ConsultationNotes: React.FC<ConsultationNotesProps> = ({ patient }) => {
  // consultation note sate
  const consultationNotes = patient.consultationNotes || [];
  const [selectedNote, setSelectedNote] = useState<ISoapNote | null>(null);
  const [openNote, setOpenNote] = useState(false);
  const [openSoapNote, setOpenSoapNote] = useState(false);

  const handleAddNew = () => {
    setOpenSoapNote(true);
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
    <div>
      <Box className="flex justify-between">
        <Typography variant="h5" gutterBottom>
          Consultation Notes
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add new
        </Button>
      </Box>

      {/* Display existing consultation notes */}
      <Grid container spacing={2}>
        {consultationNotes?.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card
              className="cursor-pointer"
              onClick={() => handleOpenNote(note)}
            >
              <CardHeader title={note.date} />
              <CardContent>
                <Typography variant="subtitle1">
                  Reason: {note.subjective.reason}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Practitioner: {note.practioner}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* open note for viewing */}
      <Modal open={openNote} onClose={handleCloseNote}>
        <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center p-2">
            <Typography variant="h6"></Typography>
            <IconButton onClick={handleCloseNote}>
              <CloseIcon />
            </IconButton>
          </div>

          {selectedNote && (
            <div className="space-y-2 p-2">
              <div className="flex justify-between">
                <Typography variant="body1">
                  <strong>Date:</strong> {selectedNote.date}
                </Typography>
                <Typography variant="body1">
                  <strong>Practitioner:</strong> {selectedNote.practioner}
                </Typography>
              </div>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Subjective
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Reason for visit</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.reason || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">
                        History of presenting illness
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.hpi || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">
                        Past medical history
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.medicalHistory || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Review of systems</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.symptoms || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Allergies</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.allergies || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">
                        Current Medications
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.subjective.currentMedications || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Objective
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Vital signs</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.objective.vitals || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Physical Exam</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.objective.physicalExam || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Laboratory Data</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.objective.laboratoryData || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Imaging Results</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.objective.imagingResults || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Other Data</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.objective.otherData || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Assessment
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">
                        Problems Identified
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.assessment.problems || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <Typography variant="body2">Diagnosis</Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography variant="body2">
                        {selectedNote.assessment.diagnosis || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Plan
                  </Typography>
                  <Typography variant="body2">
                    {selectedNote.plan || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Follow-up
                  </Typography>
                  <Typography variant="body2">
                    {selectedNote.followUp || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </Box>
      </Modal>
      
      {/* Add soap modal */}
      <AddSoapNote
        open={openSoapNote}
        setOpen={setOpenSoapNote}
        patientId={patient.id}
      />
    </div>
  );
};

export default ConsultationNotes;
