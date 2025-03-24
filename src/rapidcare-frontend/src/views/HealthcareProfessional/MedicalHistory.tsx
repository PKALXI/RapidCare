import { useState, ChangeEvent } from "react";
import { IPatient, IMedicalHistory } from "../../models/model";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  Box,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updatePatient } from "../../firebaseControllers/DatabaseOps";
import toast from "react-hot-toast";

interface MedicalHistoryProps {
  patient: IPatient;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient }) => {
  const [open, setOpen] = useState(false);
  const initialFormData = {
    medicalHistory: patient.medicalHistory?.medicalHistory || "",
    familyHistory: patient.medicalHistory?.familyHistory || "",
    allergies: patient.medicalHistory?.allergies || "",
    medications: patient.medicalHistory?.medications || "",
  };
  const [formData, setFormData] = useState<IMedicalHistory>(initialFormData);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedPatient = {
        ...patient,
        medicalHistory: formData,
      };
      await updatePatient(updatedPatient);
      toast.success("Medical history updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update medical history");
      console.error(error);
    }
  };

  return (
    <div className="pb-32">
      <div className="flex justify-between mb-4">
        <Typography variant="h5" gutterBottom>
          Medical History
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Edit
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Medical History
              </Typography>
              <Typography variant="body1">
                {patient.medicalHistory?.medicalHistory || "NA"}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Family History
              </Typography>
              <Typography variant="body1">
                {patient.medicalHistory?.familyHistory || "NA"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Allergies
              </Typography>
              <Typography variant="body1">
                {patient.medicalHistory?.allergies || "NA"}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Medications
              </Typography>
              <Typography variant="body1">
                {patient.medicalHistory?.medications || "NA"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} fullWidth maxWidth="md">
        <Box className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Edit Medical History</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="medicalHistory"
                label="Medical History"
                multiline
                rows={3}
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="familyHistory"
                label="Family History"
                multiline
                rows={3}
                value={formData.familyHistory}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="allergies"
                label="Allergies"
                multiline
                rows={3}
                value={formData.allergies}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="medications"
                label="Current Medications"
                multiline
                rows={3}
                value={formData.medications}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <div className="flex justify-center mt-4">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default MedicalHistory;
