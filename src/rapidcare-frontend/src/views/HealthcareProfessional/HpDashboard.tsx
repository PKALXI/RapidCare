/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose:Dashboard for healthcare professional
 */

import React from "react";
import Footer from "../components/AppFooter";
import Navbar from "../components/AppNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const HpDashboard = () => {
  // Pull items from redux
  const healthcareProfessional = useSelector(
    (state: RootState) => state.app.healthcareProfessional
  );
  const dashboardMetrics = healthcareProfessional?.dashboardMetrics;
  const consultations = healthcareProfessional?.consultations;

  return (
    // show the dashboard
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 pb-16">
        <h2 className="text-3xl font-semibold mb-6 ml-4">
          Hello {healthcareProfessional?.user.name}!
        </h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className="mb-4 p-2">
              <CardContent>
                <Box className="grid grid-cols-2 gap-6 mx-4">
                  <Box className="rounded-xl text-center p-6 bg-blue-50 shadow-sm">
                    {/* Visits */}
                    <Typography variant="h6" className="text-gray-700">
                      <strong>Scheduled Visits</strong>
                    </Typography>
                    <Typography variant="h5" className="text-blue-700">
                      {dashboardMetrics?.scheduledVisitsToday || 5}
                    </Typography>
                  </Box>

                  <Box className="rounded-xl text-center p-6 bg-blue-50 shadow-sm">
                    <Typography variant="h6" className="text-gray-700">
                      <strong>Total Patients</strong>
                    </Typography>
                    <Typography variant="h5" className="text-blue-700">
                      {dashboardMetrics?.newPatientsThisMonth || 5}
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex justify-center my-4 mx-4 bg-gray-50 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        label: "Patient visits this week",
                      },
                    ]}
                    series={[
                      {
                        data: [150, 200, 500, 400, 800, 2000, 1895],
                        label: "Visits",
                      },
                    ]}
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
                  Upcoming Appointments
                </Typography>
                {consultations?.map((consultation, index) => (
                  <Card key={index} className="mb-4 p-2">
                    <CardContent className="flex justify-between items-center">
                      <div>
                        <Typography variant="h6">
                          {consultation.patientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {consultation.date}
                        </Typography>
                      </div>

                      <div className="text-right">
                        <Typography variant="body1">
                          {consultation.time}
                        </Typography>
                        <Button variant="contained" color="primary">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default HpDashboard;
