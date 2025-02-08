import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";  // Importing uuidv4
import { IPatient } from "../../models/model";
import { addPatient } from "../../firebaseControllers/DatabaseOps";
import toast, { Toaster } from "react-hot-toast";


const AddPatient = ({closeModal}: {closeModal: () => void}) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          maritalStatus: "", 
        },
        contactInformation: {
          phone: formData.phone,
          address: formData.address,
          email: "", 
        },
      },
      medicalHistory: {}, 
      consultationNotes: [], 
      documents: [], 
    };

    addPatient(newPatient);

    closeModal();

    toast.success("Patient created successfully!");
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <div style={{ padding: 20 }}>
      <Toaster/>
      <Typography variant="h5" gutterBottom>
        Add New Patient
      </Typography>
      <form onSubmit={handleSubmit}>
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

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Patient
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatient;
