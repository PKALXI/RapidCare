import { IPatient } from "../../models/model";
import { Button, Typography } from "@mui/material";


interface MedicalHistoryProps {
    patient: IPatient;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient }) => {
    const allergies = patient.medicalHistory?.allergies;
    // const prescriptions = patient.medicalHistory?.prescriptions;

    return (
        <div className= "pb-32">
            <div className="flex justify-between mb-4">
                <Typography variant="h4" className="text-center mb-4 font-bold">Medical History</Typography>
                <Button variant="contained" color="primary">Edit</Button>
            </div>


            
        </div>
    );
};

export default MedicalHistory;
