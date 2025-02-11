import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../services/firebaseConfig'; // Import Firestore

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginState } from '../redux/appActions';
//import './styles.css';
import { auth, db } from '../firebase';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Admin Sign-Up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle Password Confirmation Validation
    const isPasswordMatch = password === confirmPassword;

    // Handle Login or Sign-Up
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                // **Sign-Up Logic**
                if (!isPasswordMatch) {
                    setError('Passwords do not match.');
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Store User Details in Firestore
                const role = email.startsWith('admin') ? 'admin' : 'healthcare';
                await setDoc(doc(db, 'users', user.uid), {
                    email,
                    firstName,
                    lastName,
                    role,
                });

                console.log(`Account Created: ${user.email}`);
                alert('Account successfully created! You can now log in.');
                setIsSignUp(false); // Switch back to Login mode

            } else {
                // **Login Logic (Admin or Healthcare Professional)**
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Retrieve User Role from Firestore
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const isUserAdmin = userData.role === 'admin';

                    console.log(`User authenticated: ${user.email}, Role: ${userData.role}`);

                    // Set Login State
                    dispatch(
                        setLoginState(
                            true,
                            isUserAdmin,
                            isUserAdmin ? null : userData.healthNetworkAdmin || null,
                            isUserAdmin ? null : userData.healthcareProfessional || null
                        )
                    );
                    // Redirect Based on Role
                    isUserAdmin ? navigate('/home') : navigate('/hpDashboard');
                } else {
                    setError('User role not found. Please contact support.');
                }
            }
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else {
                setError(error.message || 'An error occurred during authentication.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>{isSignUp ? 'Sign-Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                {isSignUp && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                                style={{ flex: 1 }}
                            />
                            <span style={{ marginLeft: '10px' }}>
                                {confirmPassword && (
                                    isPasswordMatch ? (
                                        <span style={{ color: 'green' }}>✔</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>✘</span>
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                )}
                {error && <p className="error">{error}</p>}
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <p>
                {isSignUp ? "Already have an account?" : "Need an account?"}{' '}
                <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Log in' : 'Sign up'}
                </span>
            </p>
        </div>
    );
};

export default Login;