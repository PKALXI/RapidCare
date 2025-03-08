import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
}

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
}: ConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="w-1/4 mx-auto mt-16 bg-white p-4 rounded relative">
                <div className="p-4">
                    <Typography variant="h6" className="mb-4 text-center">
                        {title}
                    </Typography>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            color= "error"
                            onClick={onConfirm}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal; 