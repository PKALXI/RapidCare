import { useEffect, useState } from "react";
import { Button, Dialog, Typography, IconButton, Grid, Card, CardHeader, CardContent, TextField, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IPatient, IProfileInfo } from "../../models/model";
import { useDispatch } from "react-redux";
import { updatePatientProfileInfo } from "../../redux/appActions";
import { validateField } from "../../helpers/helper";
import { v4 as uuidv4 } from "uuid";
import { emptyPatient, getPatient, updatePatient } from "../../firebaseControllers/DatabaseOps";

interface EditProfileInfoProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    patientId: string;
    profileInformation: IProfileInfo;
}

const EditProfileInfo: React.FC<EditProfileInfoProps> = ({ open, setOpen, patientId, profileInformation }) => {
    const dispatch = useDispatch();

    const [patient, setPatient] = useState(emptyPatient);

    /* 
        CURRENTLY EACH FIELD IS POPULATED WITH NOTHING...The image of DB doc is pulled and edited can be optimized
        TODO: INREET IMPLEMENT MODAL
    */

    const [formData, setFormData] = useState({
        demographics: {
            name: patient.profileInformation?.demographics?.name || "",
            gender: patient.profileInformation?.demographics?.gender || "",
            age: patient.profileInformation?.demographics?.age || 0,
            dateOfBirth: patient.profileInformation?.demographics?.dateOfBirth || "",
            healthcardNumber: patient.profileInformation?.demographics?.healthcardNumber || "",
            weight: patient.profileInformation?.demographics?.weight || "",
            height: patient.profileInformation?.demographics?.height || "",
            maritalStatus: patient.profileInformation?.demographics?.maritalStatus || "",
            occupation: patient.profileInformation?.demographics?.occupation || ""
        },
        contactInformation: {
            email: patient.profileInformation?.contactInformation?.email || "",
            phone: patient.profileInformation?.contactInformation?.phone || "",
            address: patient.profileInformation?.contactInformation?.address || ""
        },
        insuranceInformation: {
            memberID: patient.profileInformation?.insuranceInformation?.memberID || "",
            policyNumber: patient.profileInformation?.insuranceInformation?.policyNumber || "",
            provider: patient.profileInformation?.insuranceInformation?.provider || ""
        },
        emergencyContact: {
            name: patient.profileInformation?.emergencyContact?.name || "",
            relationship: patient.profileInformation?.emergencyContact?.relationship || "",
            phone: patient.profileInformation?.emergencyContact?.phone || "",
            address: patient.profileInformation?.emergencyContact?.address || ""
        }
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchPatient = async () => {
            if (patientId) {
              const patientData = await getPatient(patientId);
              if (patientData) {
                setPatient(patientData);
                
                setFormData({
                    demographics: {
                        name: patientData.profileInformation?.demographics?.name || "",
                        gender: patientData.profileInformation?.demographics?.gender || "",
                        age: patientData.profileInformation?.demographics?.age || 0,
                        dateOfBirth: patientData.profileInformation?.demographics?.dateOfBirth || "",
                        healthcardNumber: patientData.profileInformation?.demographics?.healthcardNumber || "",
                        weight: patientData.profileInformation?.demographics?.weight || "",
                        height: patientData.profileInformation?.demographics?.height || "",
                        maritalStatus: patientData.profileInformation?.demographics?.maritalStatus || "",
                        occupation: patientData.profileInformation?.demographics?.occupation || ""
                    },
                    contactInformation: {
                        email: patientData.profileInformation?.contactInformation?.email || "",
                        phone: patientData.profileInformation?.contactInformation?.phone || "",
                        address: patientData.profileInformation?.contactInformation?.address || ""
                    },
                    insuranceInformation: {
                        memberID: patientData.profileInformation?.insuranceInformation?.memberID || "",
                        policyNumber: patientData.profileInformation?.insuranceInformation?.policyNumber || "",
                        provider: patientData.profileInformation?.insuranceInformation?.provider || ""
                    },
                    emergencyContact: {
                        name: patientData.profileInformation?.emergencyContact?.name || "",
                        relationship: patientData.profileInformation?.emergencyContact?.relationship || "",
                        phone: patientData.profileInformation?.emergencyContact?.phone || "",
                        address: patientData.profileInformation?.emergencyContact?.address || ""
                    }
                });
              }
            }
          };
          fetchPatient();
        
    }, [patientId]);


    const handleChange = (section: keyof IProfileInfo, field: string, value: string | number) => {
        setFormData((prev) => ({...prev,[section]: {...prev[section],[field]: value,},}));
        const errorMessage = validateField(field, value);
        setErrors((prev) => ({ ...prev, [`${section}-${field}`]: errorMessage }));
    };

    const updateEntry = () => {
        const newPatient: IPatient = {
            ...patient,
            profileInformation: {
              ...patient.profileInformation,
              demographics: {
                ...patient.profileInformation?.demographics,
                ...formData.demographics,
                weight: Number(formData.demographics.weight),
                height: Number(formData.demographics.height)
              },
              contactInformation: formData.contactInformation,
              insuranceInformation: formData.insuranceInformation,
              emergencyContact: formData.emergencyContact
            }
        };

        updatePatient(newPatient);
    }
    
    const handleClose = () => {
        // setFormData(profileInformation);
        setErrors({});
        setOpen(false);
    };
    
    const handleSave = () => {
        if (Object.values(errors).some(error => error)) {
            return;
        }
        //Backend update

        // dispatch(updatePatientProfileInfo(patientId, formData));
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
                                            value={formData.demographics.name}
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
                <Button variant="contained" color="primary" onClick={updateEntry}>Save</Button>
            </div>  
        </Dialog>
    );
};

export default EditProfileInfo;
