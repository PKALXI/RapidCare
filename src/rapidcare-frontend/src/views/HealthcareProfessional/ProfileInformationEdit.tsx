import { useState } from "react";
import { Button, Dialog, Typography, IconButton, Grid, Card, CardHeader, CardContent, TextField, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IProfileInfo } from "../../models/model";
import { useDispatch } from "react-redux";
import { updatePatientProfileInfo } from "../../redux/appActions";
import { validateField } from "../../helpers/helper";

interface EditProfileInfoProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    patientId: string;
    profileInformation: IProfileInfo;
}

const EditProfileInfo: React.FC<EditProfileInfoProps> = ({ open, setOpen, patientId, profileInformation }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<IProfileInfo>(profileInformation);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (section: keyof IProfileInfo, field: string, value: string | number) => {
        setFormData((prev) => ({...prev,[section]: {...prev[section],[field]: value,},}));
        const errorMessage = validateField(field, value);
        setErrors((prev) => ({ ...prev, [`${section}-${field}`]: errorMessage }));
    };
    
    const handleClose = () => {
        setFormData(profileInformation);
        setErrors({});
        setOpen(false);
    };
    
    const handleSave = () => {
        if (Object.values(errors).some(error => error)) {
            return;
        }
        //Backend update

        dispatch(updatePatientProfileInfo(patientId, formData));
        setOpen(false);
    };

    return (
        <Dialog open={open} fullWidth>
                <Box className="p-4 flex justify-between items-center">
                    <Typography variant="h6">Edit Profile Information</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Grid container spacing={2} className="px-4 mb-4" >
                    <Grid item xs={12}>
                        <Card >
                            <CardHeader title="Demographics" />
                            <CardContent>
                                <Grid container spacing={4} >
                                    <Grid item xs={6} className="space-y-4">
                                        <TextField 
                                            label="Name"
                                            value={formData.demographics?.name}
                                            onChange={(e) => handleChange('demographics', 'name', e.target.value)}  
                                        />
                                        <TextField
                                            label="Gender"
                                            value={formData.demographics?.gender}
                                            onChange={(e) => handleChange('demographics', 'gender', e.target.value)}    
                                        />
                                        <TextField
                                            label="Age" 
                                            value={formData.demographics?.age}
                                            onChange={(e) => handleChange('demographics', 'age', e.target.value)}
                                            error={!!errors['demographics-age']}  
                                            helperText={errors['demographics-age']} 
                                        />
                                        <TextField
                                            label="DOB" 
                                            value={formData.demographics?.dateOfBirth}
                                            onChange={(e) => handleChange('demographics', 'dateOfBirth', e.target.value)} 
                                            error={!!errors['demographics-dateOfBirth']}  
                                            helperText={errors['demographics-dateOfBirth']}   
                                        />
                                        <TextField
                                            label="Healthcard No."
                                            value={formData.demographics?.healthcardNumber}
                                            onChange={(e) => handleChange('demographics', 'healthcardNumber', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className="space-y-4">
                                        <TextField
                                            label="Weight"
                                            value={formData.demographics?.weight}
                                            onChange={(e) => handleChange('demographics', 'weight', e.target.value)}
                                            error={!!errors['demographics-weight']}  
                                            helperText={errors['demographics-weight']}                                            
                                        />
                                        <TextField
                                            label="Height"
                                            value={formData.demographics?.height}
                                            onChange={(e) => handleChange('demographics', 'height', e.target.value)}
                                            error={!!errors['demographics-height']}  
                                            helperText={errors['demographics-height']}
                                            
                                        />
                                        <TextField
                                            label="Marital Status" 
                                            value={formData.demographics?.maritalStatus}
                                            onChange={(e) => handleChange('demographics', 'maritalStatus', e.target.value)}
                                        />
                                        <TextField
                                            label="Occupation" 
                                            value={formData.demographics?.occupation}
                                            onChange={(e) => handleChange('demographics', 'occupation', e.target.value)}    
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className="px-4 mb-4" >
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Contact Information" />
                            <CardContent>
                                <Grid container spacing={4} >
                                    <Grid item xs={12} className="space-y-4">
                                        <TextField
                                            label="Email"
                                            value={formData.contactInformation?.email}
                                            onChange={(e) => handleChange('contactInformation', 'email', e.target.value)}
                                            error={!!errors['contactInformation-email']}  
                                            helperText={errors['contactInformation-email']}   
                                        />
                                        <TextField
                                            label="Phone"
                                            value={formData.contactInformation?.phone}
                                            onChange={(e) => handleChange('contactInformation', 'phone', e.target.value)}
                                            error={!!errors['contactInformation-phone']}
                                            helperText={errors['contactInformation-phone']}  
                                        />
                                        <TextField
                                            label="Address"
                                            value={formData.contactInformation?.address}
                                            onChange={(e) => handleChange('contactInformation', 'address', e.target.value)}  
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Insurance Information" />
                            <CardContent>
                                <Grid container spacing={4} >
                                    <Grid item xs={12} className="space-y-4">
                                        <TextField
                                            label="Member ID" 
                                            value={formData.insuranceInformation?.memberID}
                                            onChange={(e) => handleChange('insuranceInformation', 'memberID', e.target.value)}  
                                        />
                                        <TextField
                                            label="Policy Number" 
                                            value={formData.insuranceInformation?.policyNumber}
                                            onChange={(e) => handleChange('insuranceInformation', 'policyNumber', e.target.value)}
                                        />
                                        <TextField
                                            label="Provider" 
                                            value={formData.insuranceInformation?.provider}
                                            onChange={(e) => handleChange('insuranceInformation', 'provider', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container className="px-4 mb-4" >
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Emergency Contact"/>
                        <CardContent>
                            <Grid container spacing={4} >
                                <Grid item xs={6} className="space-y-4">
                                    <TextField
                                        label="Name"
                                        value={formData.emergencyContact?.name}
                                        onChange={(e) => handleChange('emergencyContact', 'name', e.target.value)}       
                                    />
                                    <TextField
                                        label="Relationship" 
                                        value={formData.emergencyContact?.relationship}
                                        onChange={(e) => handleChange('emergencyContact', 'relationship', e.target.value)}    
                                    />
                                </Grid>
                                <Grid item xs={6} className="space-y-4">
                                    <TextField
                                        label="Phone"
                                        value={formData.emergencyContact?.phone}
                                        onChange={(e) => handleChange('emergencyContact', 'phone', e.target.value)}
                                        error={!!errors['emergencyContact-phone']}
                                        helperText={errors['emergencyContact-phone']}  
      
                                    />
                                    <TextField 
                                        label="Address"
                                        value={formData.emergencyContact?.address}
                                        onChange={(e) => handleChange('emergencyContact', 'address', e.target.value)}       
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <div className="flex justify-center my-4">
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            </div>  
        </Dialog>
    );
};

export default EditProfileInfo;
