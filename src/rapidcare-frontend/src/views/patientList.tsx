import React from "react";
import Footer from "./components/footer";
import Navbar from "./components/navBar";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../redux/store";

const PatientList = () => {
    const navigate = useNavigate();

    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const patients = healthcareProfessional?.patients;

    const handleAddNewPatient = () => {
        navigate('/createProfile');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-white ml-10">
                <h2 className="text-3xl font-semibold mt-6 mb-6">Patient Records</h2>
                <div className="grid grid-cols-6 gap-4 mr-10 text-center">
                    <div className="font-bold">File No.</div>
                    <div className="font-bold">Name</div>
                    <div className="font-bold">Age</div>
                    <div className="font-bold">Email</div>
                    <div className="font-bold">Phone</div>
                    <div className="font-bold">Actions</div>
                    {patients?.map((patient) => (
                        <div key={patient.id} className="p-4 bg-gray-100 rounded-lg shadow-sm col-span-6">
                            <div className="grid grid-cols-6 gap-4 text-center mt-2">
                                <div>{patient.id}</div>
                                <div>{patient.profileInformation?.demographics?.name}</div>
                                <div>{patient.profileInformation?.demographics?.age}</div>
                                <div>{patient.profileInformation?.contactInformation?.email}</div>
                                <div>{patient.profileInformation?.contactInformation?.phone}</div>
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-2 rounded">View Patient Record</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-2">
                        <button onClick={() => handleAddNewPatient()} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-2 rounded">Add New Patient Record </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PatientList;
