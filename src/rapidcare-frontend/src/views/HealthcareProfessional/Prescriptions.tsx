import React, { useState, useRef } from "react";
//import { useReactToPrint } from "react-to-print";
import { IPatient, IPrescription } from "../../models/model";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  IconButton,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
// import { addDocument } from "../../redux/appActions";
// import { doc } from "firebase/firestore";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"; // Import pdf-lib
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface PrescriptionsProps {
  patient: IPatient;
}

const Prescription: React.FC<PrescriptionsProps> = ({ patient }) => {
  const initialFormData: IPrescription = {
    id: "",
    date: "",
    plan: "",
    patientName: patient.profileInformation?.demographics?.name || "",
  };
  const [formData, setSelectedNote] = useState<IPrescription>(initialFormData);
  const dispatch = useDispatch();
  const [form, setSelectedPrescription] = useState<IPrescription | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleAddNew = () => {
    setSelectedNote(initialFormData);
    setOpenViewModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePdf = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Set page size
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const title = `Prescription for ${
        formData.patientName || "Unknown Patient"
      }`;
      const prescriptionText = formData.plan;
      const fontSizeTitle = 20;
      const fontSizeContent = 12;
      // Calculate title width and position it at center
      const textWidth = font.widthOfTextAtSize(title, fontSizeTitle);
      const xCenter = (600 - textWidth) / 2;

      // Draw title
      page.drawText(title, {
        x: xCenter,
        y: 750,
        font,
        size: fontSizeTitle,
        color: rgb(0, 0, 0),
      });

      // Draw prescription content
      const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const lines = prescriptionText.split("\n");
      let yPos = 700; // Start below the title

      for (const line of lines) {
        page.drawText(line, {
          x: 50,
          y: yPos,
          font: contentFont,
          size: fontSizeContent,
          color: rgb(0, 0, 0),
        });
        yPos -= fontSizeContent + 5;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `prescription_${formData.patientName}.pdf`);
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error("Error generating PDF:", error);
    }
  };

  const handleOpenPrescription = (prescriptions: IPrescription) => {
    setSelectedPrescription(prescriptions);
    setOpenViewModal(true);
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedPrescription(null);
  };

  const handleSave = async () => {
    try {
      if (!formData.plan) {
        toast.error("Please add prescription details");
        return;
      }
      // const newPrescription: IPrescription = {
      //     id: uuidv4(),
      //     date: new Date().toISOString(),
      //     plan: formData.plan,
      //     patientName: patient.profileInformation?.demographics?.name || ''
      // };
      //update in backend

      toast.success("Prescription saved successfully");
      setOpenViewModal(false);
      setSelectedNote(initialFormData);
    } catch (error) {
      toast.error("Failed to save prescription");
      console.error("Error saving prescription:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" gutterBottom>
          Prescription
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add new
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        {patient.prescriptions?.map((prescription) => (
          <Card key={prescription.id} className="mb-4">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Date: {new Date(prescription.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={openViewModal} onClose={handleCloseModal}>
        <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
          <div className="p-2 flex justify-between items-center">
            <Typography variant="h6">New Prescription</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <div ref={componentRef}>
            <Card className="p-2 mb-4">
              <CardContent>
                <TextField
                  name="plan"
                  label="Plan"
                  fullWidth
                  multiline
                  rows={6}
                  value={formData.plan}
                  onChange={handleChange}
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </div>

          <Box className="flex justify-between px-16 sticky bottom-0">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="primary" onClick={generatePdf}>
              Export as pdf
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Prescription;
