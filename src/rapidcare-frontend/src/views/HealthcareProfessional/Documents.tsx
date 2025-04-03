/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: View and upload documents
 */
// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

import React, { useState } from "react";
import { IPatient, IDocument } from "../../models/model";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addDocument } from "../../redux/appActions";
import toast from "react-hot-toast";

interface DocumentsProps {
  patient: IPatient;
}

const Documents: React.FC<DocumentsProps> = ({ patient }) => {
  // Get redux layer
  const dispatch = useDispatch();
  const documents = patient.documents || [];
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
    null
  );

  // Modal control
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleAddNew = () => {
    setOpenUploadModal(true);
  };

  //Need to change
  // File upload logic
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const documentId = Date.now().toString();
      const newDoc: IDocument = {
        documentId,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      };

      try {
        //Add document to backend
        dispatch(addDocument(patient.id, newDoc));
        toast.success("Lab Report saved successfully");
        setOpenUploadModal(false);
      } catch (error) {
        toast.error("Failed to save SOAP note");
        console.error(error);
      }
    }
  };

  // model open
  const handleOpenDocument = (document: IDocument) => {
    setSelectedDocument(document);
    setOpenViewModal(true);
  };

  // modal clost
  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedDocument(null);
  };

  // document open and close
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" gutterBottom>
          Lab Reports
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          Add new
        </Button>
      </div>

      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.documentId}>
            <Card
              className="cursor-pointer"
              onClick={() => handleOpenDocument(doc)}
            >
              <CardHeader title={doc.name} />
              <CardContent>
                <Typography variant="body2">
                  {doc.type.includes("image") ? "Image" : "PDF"} Document
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={openViewModal} onClose={handleCloseModal}>
        <Box className="w-3/4 mx-auto mt-16 bg-white p-4 rounded relative">
          <div className="p-2 flex justify-between items-center">
            <Typography variant="h6">{selectedDocument?.name}</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedDocument &&
            (selectedDocument.type.includes("image") ? (
              <img
                src={selectedDocument.url}
                alt={selectedDocument.name}
                className="w-full h-auto"
              />
            ) : (
              <embed src={selectedDocument.url} width="100%" height="500px" />
            ))}
        </Box>
      </Modal>

      <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Box className="w-1/3 mx-auto mt-64 bg-white p-4 rounded relative">
          <div className="p-4 flex justify-between items-center">
            <Typography variant="h6">Upload New Document</Typography>
            <IconButton onClick={() => setOpenUploadModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <input
            className="mx-4 mb-4"
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileUpload}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Documents;
