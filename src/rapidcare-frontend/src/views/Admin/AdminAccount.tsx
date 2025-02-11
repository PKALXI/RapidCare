import { useState } from "react";
import { Button, Card, CardContent, Typography, IconButton, Modal, Box, Grid, TextField, Container } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetState, saveNetworkInfo } from "../../redux/appActions";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { INetworkInfo } from "../../models/model";
import { validateField } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";

const AdminAccount = () => {
    const healthNetworkAdmin = useSelector((state: RootState) => state.app.healthNetworkAdmin);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setNetworkInfo] = useState<INetworkInfo>(healthNetworkAdmin?.networkInfo || {
        id : '',
        networkName: '',
        typeOfNetwork: 'Public',
        mainContact: '',
        email: '',
        phone: '',
        website: '',
        address: ''
    });
    const [errors, setErrors] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNetworkInfo({...formData,[name]: value});
        if (name === "email"  || name === "phone"){
            const errormessage = validateField(name, value);
            setErrors({ ...errors, [name]: errormessage });
        } 
    };

    const handleSave = () => {
        if (Object.values(errors).some(error => error)) {return;}

        // Save data in backend
        dispatch(saveNetworkInfo(formData)); 
        handleCloseModal();        
    }

    const handleOpenModal = () => {
        setOpenModal(true);
        if (healthNetworkAdmin?.networkInfo) {
            setNetworkInfo(healthNetworkAdmin.networkInfo);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setErrors({});
    };

    const handleLogout = () => {
        dispatch(resetState());
        navigate("/login");
    };

    const handleDelete = () => {
        //remove account from backend

        dispatch(resetState());
        navigate("/login");
    };



    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {healthNetworkAdmin?.isOnboardingComplete || healthNetworkAdmin?.networkInfo ? (
                <Container className="flex-grow pt-6">
                    <Typography variant="h5" gutterBottom>
                        Network Information
                    </Typography>
                    <Card className="mb-4 p-2">
                        <CardContent>
                            <div className="mt-4 space-y-2">
                                <Typography variant="body1">
                                    <strong>Name:</strong> {healthNetworkAdmin?.networkInfo?.networkName}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Type of Network:</strong> {healthNetworkAdmin?.networkInfo?.typeOfNetwork}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Contact Name:</strong> {healthNetworkAdmin?.networkInfo?.mainContact}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {healthNetworkAdmin?.networkInfo?.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Phone:</strong> {healthNetworkAdmin?.networkInfo?.phone}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Website:</strong> {healthNetworkAdmin?.networkInfo?.website}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Address:</strong> {healthNetworkAdmin?.networkInfo?.address}
                                </Typography>
                            </div>

                            <div className="flex justify-center mt-6 gap-4">
                                <Button variant="contained" color="primary" onClick={handleOpenModal}>Edit Information</Button>
                                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                                <Button variant="contained" color="error" onClick={handleDelete}>Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
                ) : (
                <div className="flex items-center flex-grow justify-center">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="mt-4"
                        onClick={handleOpenModal}
                    >
                        Add Network Info
                    </Button>
                </div> 
                )}
            

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                    <div className="p-2 flex justify-between items-center">
                        <Typography variant="h6">Network Info</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Grid container spacing={2} className="px-4 mb-4">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Network Name"
                                name="networkName"
                                value={formData?.networkName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Type of Network"
                                name="typeOfNetwork"
                                select
                                value={formData?.typeOfNetwork}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                                <option value="Non-Profit">Non-Profit</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Main Contact"
                                name="mainContact"
                                value={formData?.mainContact}
                                onChange={handleChange}
                                
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData?.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item  xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={formData?.website}
                                onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={formData?.address}
                                onChange={handleChange}
                                name="address"
                            />
                        </Grid>
                    </Grid>
                    <div className="flex justify-center my-4">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Footer />
        </div>
    );
};

export default AdminAccount;

