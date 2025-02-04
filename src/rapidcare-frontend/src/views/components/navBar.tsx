import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, InputBase, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar>
                <h1 className="text-2xl font-bold mx-16">RapidCare</h1>

                <div className="flex items-center flex-grow mx-4">
                    <div className="bg-white rounded-full flex items-center w-full">
                        <IconButton>
                            <Search />
                        </IconButton>
                        <InputBase
                            placeholder="Search Here"
                            className="mx-2 w-full text-black"    
                        />
                    </div>
                </div>

                <div>
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/home">
                                <Button color="inherit">Home</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/patients">
                                <Button color="inherit">Patients</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/appointments">
                                <Button color="inherit">Appointments</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/account">
                                <Button color="inherit">Account</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;