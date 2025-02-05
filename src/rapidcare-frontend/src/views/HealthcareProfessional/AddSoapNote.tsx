import React from 'react';
import { Card, CardContent, CardHeader, Typography, Modal, Box, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

interface AddSoapNoteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientId: string;
}

const AddSoapNote: React.FC<AddSoapNoteProps> = ({ open, setOpen, patientId }) => {

    const navigate = useNavigate();

    const handleNewSoapNote = () => {
        navigate(`/SoapView/}`);
        setOpen(false); 
      };


    return (
        <div>
          <Modal open={open} onClose={() => setOpen(false)}>
                <Box className="w-3/4 mx-auto mt-64 bg-white p-4 rounded relative">
                    <div className="p-4 flex justify-between items-center">
                        <Typography variant="h6">New Soap Note</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleNewSoapNote}>
            New Soap Note
                    </Button>                   
                </Box>
            </Modal>
        </div>
    );
};

export default AddSoapNote;