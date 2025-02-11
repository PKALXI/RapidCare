import { useState } from "react";
import { Button, Card, CardContent, Typography, IconButton, Modal, Box, Grid, TextField, Container } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IHospital } from "../../models/model";
import { validateField } from "../../helpers/helper";
import { onSnapshot } from "firebase/firestore";
import { addHospital, deleteHospital, hospitalCollection } from "../../firebaseControllers/DatabaseOps";
import { v4 as uuidv4 } from "uuid";  // Importing uuidv4



const HospitalList = () => {
    const healthNetworkAdmin = useSelector((state: RootState) => state.app.healthNetworkAdmin);
    // const hospitals = healthNetworkAdmin?.hospitals;

    const [hospitals, setHospitals] = useState<IHospital[]>([]);

    //https://firebase.google.com/docs/firestore/query-data/listen
    const unsub = onSnapshot(hospitalCollection, (querySnapshot) => {
        const hospitalList: IHospital[] = querySnapshot.docs.map((doc) => doc.data());
        setHospitals(hospitalList);
    });
    
    const initialFormData: IHospital = {
        id: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        bedCapacity: 0,
        operatingHours: "",
    };
    const [formData, setHospitalInfo] = useState<IHospital>(initialFormData);
    const [isEditing, setEditingHospital] = useState(false); 
    const [errors, setErrors] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHospitalInfo({...formData,[name]: value});
        if (name === "email"  || name === "phone"){
            const errormessage = validateField(name, value);
            setErrors({ ...errors, [name]: errormessage });
        } 
    };

    const handleDelete = (hospital: IHospital) => {
        console.log(hospital.id);
        //backend update
        deleteHospital(hospital);
    };

    const handleSave = () => {
        if (Object.values(errors).some(error => error)) {return;}

        if(isEditing){
            const newHospital: IHospital = {
                id: formData.id,
                name: formData.name,
                address: formData.address,
                email: formData.email,
                phone: formData.phone,
                bedCapacity: formData.bedCapacity,
                operatingHours: formData.operatingHours,
            };
    
            addHospital(newHospital);

        }else{
            const newHospital: IHospital = {
                id: uuidv4(),
                name: formData.name,
                address: formData.address,
                email: formData.email,
                phone: formData.phone,
                bedCapacity: formData.bedCapacity,
                operatingHours: formData.operatingHours,
            };

            addHospital(newHospital);
        }

        handleCloseModal();    
    }

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleEdit = (hospital: IHospital) => {
        setEditingHospital(true);
        setHospitalInfo(hospital);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setHospitalInfo(initialFormData);
        setEditingHospital(false); 
        setOpenModal(false);
        setErrors({});
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
                <Container className="flex-grow pt-6 pb-16">
                    <Typography variant="h5" gutterBottom>
                        Hospitals
                    </Typography>
                    <Card className="mb-4 p-2">
                        <Grid container spacing={2} className="text-center">
                            <Grid item xs={12} sm={2} md={2}><Typography fontWeight="bold">Name</Typography></Grid>
                            <Grid item xs={12} sm={3} md={3}><Typography fontWeight="bold">Address</Typography></Grid>
                            <Grid item xs={12} sm={3} md={3}><Typography fontWeight="bold">Email</Typography></Grid>
                            <Grid item xs={12} sm={2} md={2}><Typography fontWeight="bold">Phone</Typography></Grid>
                            <Grid item xs={12} sm={2} md={2}><Typography fontWeight="bold">Actions</Typography></Grid>
                        </Grid>
                    </Card>
                    {hospitals?.map((hospital) => (
                    <Card key={hospital.id} className="mb-4 p-2">
                        <CardContent>
                            <Grid container spacing={2} className="text-center">
                                <Grid item xs={12} sm={2} md={2}><Typography>{hospital.name}</Typography></Grid>
                                <Grid item xs={12} sm={3} md={3}><Typography>{hospital.address}</Typography></Grid>
                                <Grid item xs={12} sm={3} md={3}><Typography>{hospital.email}</Typography></Grid>
                                <Grid item xs={12} sm={2} md={2}><Typography>{hospital.phone}</Typography></Grid>
                                <Grid item xs={6} sm={1} md={1}>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(hospital)} >Edit</Button>
                                </Grid>
                                <Grid item xs={6} sm={1} md={1}>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(hospital)} >Delete</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    ))}
                    <div className="flex justify-center mt-6">
                        <Button variant="contained" color="primary" onClick={handleAdd}>Add New Hospital</Button>
                    </div>
                </Container>

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                        <div className="p-2 flex justify-between items-center">
                            <Typography variant="h6"> {isEditing ? "Edit Hospital" : "Add New Hospital"}</Typography>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Grid container spacing={2} className="mb-4">
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hospital Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email} 
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Bed Capacity"
                                name="bedCapacity"
                                type="number"
                                value={formData.bedCapacity}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Operating Hours"
                                name="operatingHours"
                                value={formData.operatingHours}
                                onChange={handleChange}
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

export default HospitalList;

