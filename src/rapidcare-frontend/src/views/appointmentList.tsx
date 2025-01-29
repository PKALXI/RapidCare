import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "./components/footer";
import Navbar from "./components/navBar";

const AppointmentsList = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const consultations = healthcareProfessional?.consultations;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-white ml-10">
                <h2 className="text-3xl font-semibold mt-6 mb-6">Upcoming Appointments</h2>
                <ul className="space-y-4 mr-10">
                    {consultations?.map((consultation, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 rounded-lg shadow-sm  p-4">
                            <div className="flex items-center">
                                <div>
                                    <h3 className="text-xl font-semibold">{consultation.patientName}</h3>
                                    <p className="text-gray-600">{consultation.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{consultation.time}</p>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-2 rounded"> View Details </button>
                            </div>
                        </li>
                    ))}
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-2 rounded"> Add New Appointment </button>
                    </div>
                </ul>

            </div>
            <Footer />
        </div>
    );
};

export default AppointmentsList;
