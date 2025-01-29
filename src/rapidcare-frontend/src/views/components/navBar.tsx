import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="flex items-center bg-black text-white py-2">
            <h1 className="text-2xl font-bold mr-16 ml-16">RapidCare</h1>
            <div className="flex items-center flex-grow">
                <input
                    type="text"
                    placeholder="Search Here"
                    className="p-2 rounded-full bg-white text-black flex-grow"
                />
            </div>
            <div>
                <ul className="flex gap-10 ml-16 mr-16">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/patients">Patients</Link>
                    </li>
                    <li>
                        <Link to="/appointments">Appointments</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
