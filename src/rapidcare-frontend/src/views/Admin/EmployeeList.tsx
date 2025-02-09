import { useState } from "react";
import { Button, Card, CardContent, Typography, IconButton, Modal, Box, Grid, TextField, Container} from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import CloseIcon from "@mui/icons-material/Close";
import { IHealthcareProfessional } from "../../models/model";
import { validateField } from "../../helpers/helper";
import { addEmployee, updateEmployee, deleteEmployee } from "../../redux/appActions";

const EmployeeList = () => {
    const healthNetworkAdmin = useSelector((state: RootState) => state.app.healthNetworkAdmin);
    const hospitals = healthNetworkAdmin?.hospitals || [];
   
    const initialFormData: IHealthcareProfessional = {
        id: "", //add unique id
        name: "",
        role: "",
        hospital: "",
        department: "",
        email: "",
        phone: "",
        employmentStatus: ""
    };
    
    const [formData, setEmployeeInfo] = useState<IHealthcareProfessional>(initialFormData);
    const [isEditing, setEditingEmployee] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [selectedHospital, setSelectedHospital] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeInfo({ ...formData, [name]: value });
        if (name === "email" || name === "phone") {
            const errorMessage = validateField(name, value);
            setErrors({ ...errors, [name]: errorMessage });
        }
    };

    const handleSave = () => {
        if (Object.values(errors).some(error => error)) { return; }
        
        //backend updates here
        if (isEditing) {
            dispatch(updateEmployee(formData));
        } else {
            dispatch(addEmployee(formData));
        }
        handleCloseModal();
    };

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleDelete = (employee: IHealthcareProfessional) => {
        //backend update here
        //change to only pass id once firestore is setup for this same in action and reducer, for now using name
        dispatch(deleteEmployee(employee)); 
    };


    const handleEdit = (employee: IHealthcareProfessional) => {
        setEditingEmployee(true);
        setEmployeeInfo(employee);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setEmployeeInfo(initialFormData);
        setEditingEmployee(false);
        setOpenModal(false);
        setErrors({});
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Container className="flex-grow pt-6 pb-16">
                <Typography variant="h5" gutterBottom>
                    Employees
                </Typography>
                <div className ="my-4">
                    <TextField
                        fullWidth
                        select
                        label="Filter by Hospital"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        slotProps={{
                            inputLabel: {
                              shrink: true,
                            }
                        }}
                    >
                        <option value="">All Hospitals</option>
                        {hospitals.map((hospital) => (
                            // value should be hospital.id
                            <option key={hospital.id} value={hospital.name}> 
                                {hospital.name}
                            </option>
                        ))}
                    </TextField>
                </div>
                <Card className="mb-4 p-2">
                    <Grid container spacing={2} className="text-center">
                        <Grid item xs={12} sm={3}><Typography fontWeight="bold">Name</Typography></Grid>
                        <Grid item xs={12} sm={2}><Typography fontWeight="bold">Role</Typography></Grid>
                        <Grid item xs={12} sm={3}><Typography fontWeight="bold">Hospital</Typography></Grid>
                        <Grid item xs={12} sm={2}><Typography fontWeight="bold">Phone</Typography></Grid>
                        <Grid item xs={12} sm={2}><Typography fontWeight="bold">Actions</Typography></Grid>
                    </Grid>
                </Card>
                {hospitals
                    //should be hospital.id = selectedHospital
                    .filter(hospital => !selectedHospital || hospital.name === selectedHospital)
                    .flatMap((hospital => hospital.healthcareProfessionals?.map((employee) => (
                        <Card key={employee.id} className="mb-4 p-2">
                            <CardContent>
                            <Grid container spacing={2} className="text-center">
                                <Grid item xs={12} sm={3}><Typography>{employee.name}</Typography></Grid>
                                <Grid item xs={12} sm={2}><Typography>{employee.role}</Typography></Grid>
                                <Grid item xs={12} sm={3}><Typography>{hospital.name}</Typography></Grid>
                                <Grid item xs={12} sm={2}><Typography>{employee.phone}</Typography></Grid>
                                <Grid item xs={6} sm={1}>
                                <Button variant="contained" color="primary" onClick={() => handleEdit(employee)}>Edit</Button>
                                </Grid>
                                <Grid item xs={6} sm={1}>
                                <Button variant="contained" color="error" onClick={() => handleDelete(employee)}>Delete</Button>
                                </Grid>
                            </Grid>
                            </CardContent>
                        </Card>
                        ))
                    ))}
                    <div className="flex justify-center mt-6">
                    <Button variant="contained" color="primary" onClick={handleAdd}>Add New Employee</Button>
                </div>
            </Container>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
                    <div className="p-2 flex justify-between items-center">
                        <Typography variant="h6">{isEditing ? "Edit Employee" : "Add New Employee"}</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Grid container spacing={2} className="mb-4">
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Role" name="role" value={formData.role} onChange={handleChange} /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Hospital"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                                slotProps={{
                                    inputLabel: {
                                      shrink: true,
                                    }
                                  }}
                            >
                                <option value="Select">Select Hospital</option>
                                {hospitals.map(hospital => (
                                    //value should be hospital.id
                                    <option key={hospital.id} value={hospital.name}>{hospital.name}</option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Employment Status" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} /></Grid>
                    </Grid>
                    <div className="flex justify-center my-4">
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    </div>
                </Box>
            </Modal>
            <Footer />
        </div>
    );
};

export default EmployeeList;