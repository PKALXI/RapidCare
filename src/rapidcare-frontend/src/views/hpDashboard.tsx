import React from "react";
import Footer from "./components/footer";
import Navbar from "./components/navBar";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";



const HpDashboard = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const dashboardMetrics = healthcareProfessional?.dashboardMetrics;
    const consultations = healthcareProfessional?.consultations;

    return (

        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-gray-100">
                <h2 className="text-3xl font-semibold mb-6 ml-4">Hello {healthcareProfessional?.name}!</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className=" bg-gradient-to-r from-blue-200 to-blue-400 text-black rounded-lg shadow-sm p-6">
                        <h3 className="text-2xl mb-4 ml-6">Scheduled Visits for Today</h3>
                        <p className="text-6xl font-bold mb-4 ml-6">{dashboardMetrics?.scheduledVisitsToday}</p>
                        <div className="flex mt-6 ml-6 mb-4">
                            <div className="rounded-lg bg-blue-100 p-6 mr-12">
                                <h4 className="text-lg font-bold">New Patients This Month</h4>
                                <div className="p-4">
                                    <p className="text-2xl font-bold">{dashboardMetrics?.newPatientsThisMonth}</p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-6">
                                <h4 className="text-lg font-bold">Total Patients</h4>
                                <div className="p-4">
                                    <p className="text-2xl font-bold">{dashboardMetrics?.totalPatients}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white md:col-span-1 rounded-lg shadow-lg p-6 ">
                        <h3 className="text-2xl font-bold mb-4 ml-6">Upcoming Appointments</h3>
                        <ul className="space-y-4 ml-6 mr-6">
                            {consultations?.map((consultation, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                                    <div className="flex items-center ml-6">
                                        <div>
                                            <p className="font-semibold">{consultation.patientName}</p>
                                            <p className="text-gray-600">{consultation.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right mr-6">
                                        <p className="font-semibold">{consultation.time}</p>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-2 rounded">
                                            View Patient Record
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

// const mapStateToProps = (state: AppState) => {
//     console.log(state);
//     return {
//         healthcareProfessional: state.login.healthcareProfessional,
//         dashboardMetrics: state.login.healthcareProfessional?.dashboardMetrics,
//         consultations: state.login.healthcareProfessional?.consultations,
//     };

// };

export default (HpDashboard);