import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Importing uuidv4
import { IPatient } from "../../models/model";
import { addPatient } from "../../firebaseControllers/DatabaseOps";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { calculateAge } from "../../helpers/helper";

const AddPatient = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    transcription: "",
    phone: "",
    address: "",
    maritalStatus: "",
    occupation: "",
    date: "",
    practioner: "",
    reason: "",
    hpi: "",
    medicalHistory: "",
    symptoms: "",
    allergies: "",
    currentMedications: "",
    vitals: "",
    physicalExam: "",
    laboratoryData: "",
    imagingResults: "",
    otherData: "",
    problems: "",
    diagnosis: "",
    plan: "",
    followUp: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    toast.success("HELLO");

    e.preventDefault();
    const newPatient: IPatient = {
      id: uuidv4(),
      profileInformation: {
        demographics: {
          name: formData.name,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          age: calculateAge(formData.dateOfBirth),
          weight: 0,
          height: 0,
          maritalStatus: formData.maritalStatus,
          occupation: formData.address,
        },
        contactInformation: {
          email: "",
          phone: formData.phone,
          address: formData.address,
        },
      },
      medicalHistory: {
        medicalHistory: formData.medicalHistory,
        familyHistory: "",
        allergies: formData.allergies,
        medications: formData.currentMedications,
      },
      consultationNotes: [
        {
          id: "", //Kalsi look into this
          date: formData.date,
          practioner: formData.practioner,
          transcription: formData.transcription,
          subjective: {
            reason: formData.reason,
            hpi: formData.hpi,
            medicalHistory: formData.medicalHistory,
            symptoms: formData.symptoms,
            allergies: formData.allergies,
            currentMedications: formData.currentMedications,
          },
          objective: {
            vitals: formData.vitals,
            physicalExam: formData.physicalExam,
            laboratoryData: formData.laboratoryData,
            imagingResults: formData.imagingResults,
            otherData: formData.otherData,
          },
          assessment: {
            problems: formData.problems,
            diagnosis: formData.diagnosis,
          },
          plan: formData.plan,
          followUp: formData.followUp,
        },
      ],
      documents: [],
      prescriptions: [],
    };

    addPatient(newPatient);
    closeModal();
    toast.success("Patient created successfully!");
  };

  return (
    <>
      <Toaster />
      <Box className="w-3/4 mx-auto my-10 bg-white p-4 rounded relative max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit}>
          <Box className="flex justify-between items-center p-2">
            <Typography variant="h6">Add New Patient</Typography>
            <IconButton onClick={() => closeModal()}>
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
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="name"
                      label="Name"
                      fullWidth
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="gender"
                      select
                      label="Gender"
                      fullWidth
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="dateOfBirth"
                      type="date"
                      label="Date of Birth"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="phone"
                      label="Phone"
                      fullWidth
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Address"
                      fullWidth
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="p-2">
              <Typography variant="h6" gutterBottom>
                Social Information
              </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="maritalStatus"
                      label="Marital Status"
                      fullWidth
                      value={formData.maritalStatus}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="occupation"
                      label="Occupation"
                      fullWidth
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="p-2">
              <Typography variant="h6" gutterBottom>
                Subjective
              </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="reason"
                      fullWidth
                      label="Reason for visit"
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="hpi"
                      fullWidth
                      label="History of Presenting Illness"
                      value={formData.hpi}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="medicalHistory"
                      fullWidth
                      label="Past Medical History"
                      multiline
                      rows={3}
                      value={formData.medicalHistory}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="symptoms"
                      fullWidth
                      label="Review of Systems"
                      multiline
                      rows={3}
                      value={formData.symptoms}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="allergies"
                      fullWidth
                      label="Allergies"
                      multiline
                      rows={3}
                      value={formData.allergies}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="currentMedications"
                      fullWidth
                      label="Current Medications"
                      multiline
                      rows={3}
                      value={formData.currentMedications}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="p-2">
              <Typography variant="h6" gutterBottom>
                Objective
              </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="vitals"
                      fullWidth
                      label="Vital Signs"
                      multiline
                      rows={3}
                      value={formData.vitals}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="physicalExam"
                      fullWidth
                      label="Physical Exam"
                      multiline
                      rows={3}
                      value={formData.physicalExam}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="laboratoryData"
                      fullWidth
                      label="Laboratory Data"
                      multiline
                      rows={3}
                      value={formData.laboratoryData}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="imagingResults"
                      fullWidth
                      label="Imaging Results"
                      multiline
                      rows={3}
                      value={formData.imagingResults}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="otherData"
                      fullWidth
                      label="Other Data"
                      multiline
                      rows={3}
                      value={formData.otherData}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="p-2">
              <Typography variant="h6" gutterBottom>
                Assessment
              </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="problems"
                      fullWidth
                      label="Problems Identified"
                      multiline
                      rows={3}
                      value={formData.problems}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="diagnosis"
                      fullWidth
                      label="Diagnosis"
                      multiline
                      rows={3}
                      value={formData.diagnosis}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className="p-2">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="plan"
                      fullWidth
                      label="Plan"
                      multiline
                      rows={3}
                      value={formData.plan}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="followUp"
                      fullWidth
                      label="Follow-up"
                      multiline
                      rows={3}
                      value={formData.followUp}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          <Box className="flex justify-between px-16 py-2 sticky bottom-0">
            <Button variant="contained" color="primary">
              Start Recording
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create Patient
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddPatient;
