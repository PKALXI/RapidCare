/**
 * Author: Pranav Kalsi, Inreet Kaur, Gurleen Rahi
 * Last Modified: March 7th
 * Purpose: Display patient profile
 *
 * FIREBASE and backend Related operations + AI Chat and respective state management completed by Pranav Kalsi
 */

// https://firebase.google.com/
// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/AppNavBar";
import Footer from "../components/AppFooter";
import MedicalHistory from "./MedicalHistory";
import ProfileInformation from "./ProfileInformation";
import ConsultationNotes from "./ConsultationNotes";
import Documents from "./Documents";
import Prescriptions from "./Prescriptions";
import DataRow from "../components/DataRow";
import PersonIcon from "@mui/icons-material/Person";
import {
  deletePatient,
  emptyPatient,
  getPatient,
  patientCollection,
} from "../../firebaseControllers/DatabaseOps";
import { IPatient } from "../../models/model";
import { onSnapshot, query, where } from "firebase/firestore";
import Referrals from "./Referrals";
import ConfirmationModal from "../components/ConfirmationModal";
import toast from "react-hot-toast";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AIChat from "./AIChat";

const PatientProfile = () => {
  // patient id
  const { patientId } = useParams<{ patientId: string }>();

  // Navigation
  const navigate = useNavigate();
  const healthcareProfessional = useSelector(
    (state: RootState) => state.app.healthcareProfessional
  );

  // Patient state
  const [patient, setPatient] = useState<IPatient>(emptyPatient);
  const [activeTab, setActiveTab] = useState("Profile Information");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  // DB listener
  useEffect(() => {
    const q = query(patientCollection, where("id", "==", patientId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPatient(doc.data());
      });
    });
  }, [patientId]);

  // Close profile and return to patient list
  const handleCloseProfile = () => {
    // unsubscribe();
    // console.log('called!');
    // navigate("/patients");
    navigate("/patients");
  };

  // Delete patient 
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  // Delete patient
  const handleDeleteConfirm = () => {
    try {
      // dispatch(deletePatient(patient.id));
      deletePatient(patient);
      toast.success("Patient profile deleted successfully");
      setOpenDeleteModal(false);
      navigate("/patients");
    } catch (error) {
      toast.error("Failed to delete patient profile");
      console.error(error);
    }
  };

  // Cancel delete operation
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  // open AI chat
  const handleOpenChat = () => {
    setOpenChat(true);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      {/* AI Chat Icon*/}
      {!openChat && (
        <Button
          variant="contained"
          // endIcon={}
          sx={{
            position: "fixed",
            bottom: 50,
            right: 30,
            borderRadius: "50%",
            minWidth: 0,
            padding: 2,
            zIndex: 1000,
          }}
          onClick={handleOpenChat}
        >
          <TipsAndUpdatesIcon />
        </Button>
      )}

      {/* AI Chat */}
      {openChat && (
        <div className="fixed bottom-8 right-8 z-1000">
          <AIChat setOpenChat={setOpenChat} patient={patient} />
        </div>
      )}

      {/* Navigation sidebar */}
      <Box className="flex flex-col flex-grow">
        <Box className="flex justify-between mt-6 mb-2 px-32">
          <Box className="flex justify-center">
            <Avatar sx={{ width: 100, height: 100 }}>
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
          </Box>
          <Box className="flex flex-col justify-center">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Grid container spacing={3}>
                  <DataRow
                    label="Name"
                    value={patient.profileInformation?.demographics?.name}
                  />
                  <DataRow
                    label="Gender"
                    value={patient.profileInformation?.demographics?.gender}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={3}>
                  <DataRow
                    label="Age"
                    value={patient.profileInformation?.demographics?.age}
                  />
                  <DataRow
                    label="Marital Status"
                    value={
                      patient.profileInformation?.demographics?.maritalStatus
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={3}>
                  <DataRow
                    label="Height"
                    value={`${patient.profileInformation?.demographics?.height} cm`}
                  />
                  <DataRow
                    label="Weight"
                    value={`${patient.profileInformation?.demographics?.weight} lbs`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className="flex flex-col justify-center space-y-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseProfile}
            >
              Close Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete Profile
            </Button>
          </Box>
        </Box>
        <Divider />

        <Box className="flex flex-grow">
          <Box className="w-1/4 bg-blue-50 p-4 rounded">
            <Typography variant="h6" className="text-center mb-4">
              Navigation
            </Typography>
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={(event, newValue) => setActiveTab(newValue)}
            >
              <Tab label="Profile Information" value="Profile Information" />
              <Tab label="Medical History" value="Medical History" />
              <Tab label="Consultation Notes" value="Consultation Notes" />
              <Tab label="Lab Reports" value="Documents" />
              <Tab label="Prescriptions" value="Prescriptions" />
              <Tab label="Referrals" value="Referrals" />
            </Tabs>
          </Box>

          <Box className="w-3/4 p-4 overflow-auto max-h-[calc(100vh-150px)]">
            {activeTab === "Profile Information" && (
              <ProfileInformation patientId={patient.id} />
            )}
            {activeTab === "Medical History" && (
              <MedicalHistory patient={patient} />
            )}
            {activeTab === "Consultation Notes" && (
              <ConsultationNotes patient={patient} />
            )}
            {activeTab === "Documents" && <Documents patient={patient} />}
            {activeTab === "Prescriptions" && (
              <Prescriptions patient={patient} />
            )}
            {activeTab === "Referrals" && <Referrals patient={patient} />}
          </Box>
        </Box>
      </Box>
      <ConfirmationModal
        open={openDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={`Are you sure you want to delete ${patient.profileInformation?.demographics?.name}'s profile?`}
      />
      <Footer />
    </div>
  );
};

export default PatientProfile;
