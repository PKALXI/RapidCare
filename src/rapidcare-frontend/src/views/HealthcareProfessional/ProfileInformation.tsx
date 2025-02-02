import { useState } from "react";
import { IPatient, IProfileInfo } from "../../models/model";
import { Card, CardContent, CardHeader, Grid, Button, Typography, Box} from "@mui/material";
import DataRow from '../components/DataRow';
import EditProfileInfo from "./ProfileInformationEdit";

interface ProfileInformationProps {
  patient: IPatient;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({ patient }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className= "pb-32">
      <Box className="flex justify-between">
        <Typography variant="h5" gutterBottom>Profile Information</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>Edit</Button>
      </Box>

      <Card className="my-4">
        <CardHeader title="Demographics"/>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <DataRow label="Name" value={patient.profileInformation?.demographics?.name} />
                <DataRow label="Gender" value={patient.profileInformation?.demographics?.gender} />
                <DataRow label="Age" value={patient.profileInformation?.demographics?.age} />
                <DataRow label="DOB" value={patient.profileInformation?.demographics?.dateOfBirth} />
                <DataRow label="Healthcard No." value={patient.profileInformation?.demographics?.healthcardNumber} />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <DataRow label="Weight" value={`${patient.profileInformation?.demographics?.weight} lbs`} />
                <DataRow label="Height" value={`${patient.profileInformation?.demographics?.height} cm`} />
                <DataRow label="Marital Status" value={patient.profileInformation?.demographics?.maritalStatus} />
                <DataRow label="Occupation" value={patient.profileInformation?.demographics?.occupation} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Contact Information"/>
            <CardContent>
              <Grid container spacing={2}>
                <DataRow label="Email" value={patient.profileInformation?.contactInformation?.email} />
                <DataRow label="Phone" value={patient.profileInformation?.contactInformation?.phone} />
                <DataRow label="Address" value={patient.profileInformation?.contactInformation?.address} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Insurance Information"/>
            <CardContent>
              <Grid container spacing={2}>
                <DataRow label="Member ID" value={patient.profileInformation?.insuranceInformation?.memberID} />
                <DataRow label="Policy Number" value={patient.profileInformation?.insuranceInformation?.policyNumber} />
                <DataRow label="Provider" value={patient.profileInformation?.insuranceInformation?.provider} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader title="Emergency Contact" />
        <CardContent>
          <Grid container spacing={2}>
            <DataRow label="Name" value={patient.profileInformation?.emergencyContact?.name} />
            <DataRow label="Relationship" value={patient.profileInformation?.emergencyContact?.relationship} />
            <DataRow label="Phone" value={patient.profileInformation?.emergencyContact?.phone} />
            <DataRow label="Address" value={patient.profileInformation?.emergencyContact?.address} />
          </Grid>
        </CardContent>
      </Card>       

      <EditProfileInfo
        open={open}
        setOpen={setOpen}
        patientId={patient.id}
        profileInformation={patient.profileInformation as IProfileInfo}
      />

    </div>
  );
};

export default ProfileInformation;
