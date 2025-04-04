/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Admin Account
 */

// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Box,
  Grid,
  TextField,
  Container,
} from "@mui/material";
import Footer from "../components/AppFooter";
import Navbar from "../components/AppNavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetState, saveNetworkInfo } from "../../redux/appActions";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { INetworkInfo } from "../../models/model";
import { validateField } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

const AdminAccount = () => {
  const healthNetworkAdmin = useSelector(
    (state: RootState) => state.app.healthNetworkAdmin
  );
  const [openModal, setOpenModal] = useState(false);
  const [formData, setNetworkInfo] = useState<INetworkInfo>(
    healthNetworkAdmin?.networkInfo || {
      id: "",
      networkName: "",
      typeOfNetwork: "Public",
      mainContact: "",
      email: "",
      phone: "",
      website: "",
      address: "",
    }
  );

  // Outline any errors and setup redux layer access
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Change for any items
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNetworkInfo({ ...formData, [name]: value });
    if (name === "email" || name === "phone") {
      const errormessage = validateField(name, value);
      setErrors({ ...errors, [name]: errormessage });
    }
  };

  // Save any changes
  const handleSave = () => {
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    try {
      // Save data in backend
      dispatch(saveNetworkInfo(formData));
      toast.success("Network information saved successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save network information");
      console.error(error);
    }
  };

  // Handle open modal
  const handleOpenModal = () => {
    setOpenModal(true);
    if (healthNetworkAdmin?.networkInfo) {
      setNetworkInfo(healthNetworkAdmin.networkInfo);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setErrors({});
  };

  // Logout of the account
  const handleLogout = () => {
    try {
      dispatch(resetState());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  // Delete click
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    try {
      //remove account from backend
      dispatch(resetState());
      toast.success("Account deleted successfully");
      setOpenDeleteModal(false);
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account");
      console.error(error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Information of admin displayed */}
      {healthNetworkAdmin?.isOnboardingComplete ||
      healthNetworkAdmin?.networkInfo ? (
        <Container className="flex-grow pt-6">
          <Typography variant="h5" gutterBottom>
            Network Information
          </Typography>
          <Card className="mb-4 p-2">
            <CardContent>
              <div className="mt-4 space-y-2">
                <Typography variant="body1">
                  <strong>Name:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.networkName}
                </Typography>
                <Typography variant="body1">
                  <strong>Type of Network:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.typeOfNetwork}
                </Typography>
                <Typography variant="body1">
                  <strong>Contact Name:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.mainContact}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Website:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.website}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong>{" "}
                  {healthNetworkAdmin?.networkInfo?.address}
                </Typography>
              </div>

            {/* CRUD functions */}
              <div className="flex justify-center mt-6 gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
                >
                  Edit Information
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  Delete Account
                </Button>
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

      {/* Edit/Add function via modal */}
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
            <Grid item xs={12} md={6}>
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
      
      {/* Delete confirmation */}
      <ConfirmationModal
        open={openDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Are you sure you want to delete the account?"
      />
      <Footer />
    </div>
  );
};

export default AdminAccount;
