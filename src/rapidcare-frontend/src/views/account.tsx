import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "./components/footer";
import Navbar from "./components/navBar";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/appActions";

const AccountSettings = () => {
    const healthcareProfessional = useSelector((state: RootState) => state.app.healthcareProfessional);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetState());
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow p-6 bg-white ml-10">
                <h2 className="text-3xl font-semibold mt-6 mb-6">Account Settings</h2>
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    <p>Name: {healthcareProfessional?.name}</p>
                    <p>Email: {healthcareProfessional?.email}</p>
                    <p>Phone: {healthcareProfessional?.phone}</p>
                    <p>Hospital: {healthcareProfessional?.hospital}</p>
                    <p>Department: {healthcareProfessional?.department}</p>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 mt-10 rounded">Edit Information</button>
                    </div>
                    <div className="mt-4">
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2.5 text-white rounded mt-4" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AccountSettings;
