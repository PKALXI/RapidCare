import { Button, Card, CardContent, Typography, List, ListItem, ListItemText, Grid, Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setOnboardingStatus } from "../../redux/appActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';

const AdminDashboard = () => {
    const healthNetworkAdmin = useSelector((state: RootState) => state.app.healthNetworkAdmin)
    const isOnboardingComplete = healthNetworkAdmin?.isOnboardingComplete;
    const dashboardMetrics = healthNetworkAdmin?.dashboardMetrics;
    const hospitals = healthNetworkAdmin?.hospitals;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleComplete = () => {
        dispatch(setOnboardingStatus(true));
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {isOnboardingComplete ? (
                <div className="flex-grow p-6 pb-16">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Card className="mb-4 p-2">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                Metrics
                                </Typography>
                                <Box className="grid grid-cols-2 gap-6 mx-4">
                                    <Box className="rounded-xl text-center p-6 bg-blue-50 shadow-sm">
                                        <Typography variant="h6" className="text-gray-700">
                                        <strong>Total Hospitals</strong>
                                        </Typography>
                                        <Typography variant="h5" className="text-blue-700">
                                        {dashboardMetrics?.totalHospitals || 5}
                                        </Typography>       
                                    </Box>

                                    <Box className="rounded-xl text-center p-6 bg-blue-50 shadow-sm">
                                        <Typography variant="h6" className="text-gray-700">
                                        <strong>Total Employees</strong>
                                        </Typography>
                                        <Typography variant="h5" className="text-blue-700">
                                        {dashboardMetrics?.totalEmployees || 5}
                                        </Typography>       
                                    </Box>
                                </Box>
                                <Box className="flex justify-center my-4 mx-4 bg-gray-50 rounded-lg shadow-md">
                                    <BarChart
                                        xAxis={[{scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], label: 'Patient visits this week',}]}
                                        series={[{data: [150, 200, 500, 400, 800, 2000, 1895],label: 'Visits',},]}
                                        width={500}
                                        height={300}
                                    />
                                    </Box>
                            </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Card className="mb-4 p-2">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Hospitals
                                    </Typography>
                                    {hospitals?.map((hospital) => (
                                    <Card key={hospital.id} className="mb-4 p-2">
                                        <CardContent>
                                            <Grid container spacing={2} className="text-center">
                                                <Grid item xs={12} sm={4} md={4}><Typography>{hospital.name}</Typography></Grid>
                                                <Grid item xs={12} sm={4} md={4}><Typography>{hospital.email}</Typography></Grid>
                                                <Grid item xs={12} sm={4} md={4}><Typography>{hospital.phone}</Typography></Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    ))}
                                    <div className="flex justify-center mt-6">
                                        <Button variant="contained" color="primary" onClick={ ()=> {navigate('/hospitals')}}>View Details</Button>
                                    </div>
                                </CardContent>
                            </Card> 
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className="flex items-center flex-grow justify-center">
                    <Card className="p-4 text-center space-y-4">
                        <CardContent>
                            <Typography variant="h5">Welcome to RapidCare</Typography>
                            <Typography className="text-gray-600 mt-2">
                                Complete the following steps to onboard your Healthcare Network.
                            </Typography>
                            <List className="text-left mt-4">
                                <ListItem>
                                    <ListItemText primary="Step 1: Navigate to ACCOUNT to add network info." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Step 2: Navigate to HOSPITALS to add hospitals." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Step 3: Navigate to EMPLOYEES to add employee information." />
                                </ListItem>  
                            </List>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className="mt-4"
                                onClick={handleComplete}
                            >
                                Complete
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AdminDashboard;
