import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginState, setUserData } from '../redux/appActions';
import { auth, db } from '../firebase';
import { INetworkInfo } from '../models/model'; // Import the INetworkInfo interface
import { addAdmin, healthcareProfessionalCollection, networkInfoCollection } from '../firebaseControllers/DatabaseOps';
import { doc, getDoc } from 'firebase/firestore';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [networkName, setNetworkName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isPasswordMatch = password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                if (!isPasswordMatch) {
                    setError('Passwords do not match.');
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Create an INetworkInfo object
                const networkInfo: INetworkInfo = {
                    id: user.uid,
                    networkName: networkName,
                    typeOfNetwork: 'Public',
                    mainContact: `${firstName} ${lastName}`,
                    email: email,
                    phone: '',
                    website: '',
                    address: ''
                };

                addAdmin(networkInfo);

                console.log(`Account Created: ${user.email}`);
                alert('Account successfully created! You can now log in.');
                setIsSignUp(false);

            } else {
                const person = await signInWithEmailAndPassword(auth, email, password);
                const docId = person.user.uid;

                const docRef = doc(networkInfoCollection, docId);
                const docSnap = await getDoc(docRef);

                const d2 = doc(healthcareProfessionalCollection, docId);
                const d2Snap = await getDoc(d2);

                if (docSnap.exists()) {
                    console.log("Document exists:", docSnap.data());
                    dispatch(setLoginState(true,true));
                } 
                
                if (d2Snap.exists()){
                    console.log('Called');
                    // const userData = d2Snap.data();
                    // console.log(userData);
                    dispatch(setLoginState(false,true));
                    dispatch(setUserData(d2Snap.data()));
                }

                // const userDoc = await getDoc(doc(db, 'users', user.uid));
                // if (userDoc.exists()) {
                //     const userData = userDoc.data();
                //     const isUserAdmin = userData.role === 'admin';

                //     console.log(`User authenticated: ${user.email}, Role: ${userData.role}`);

                //     isUserAdmin ? navigate('/home') : navigate('/hpDashboard');
                // } else {
                //     setError('User role not found. Please contact support.');
                // }
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
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign-Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <div className="mb-4 text-left">
                            <label className="block font-bold mb-1">First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Enter your first name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label className="block font-bold mb-1">Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label className="block font-bold mb-1">Network Name:</label>
                            <input
                                type="text"
                                value={networkName}
                                onChange={(e) => setNetworkName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </>
                )}
                <div className="mb-4 text-left">
                    <label className="block font-bold mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label className="block font-bold mb-1">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {isSignUp && (
                    <div className="mb-4 text-left">
                        <label className="block font-bold mb-1">Confirm Password:</label>
                        <div className="flex items-center">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <span className="ml-2">
                                {confirmPassword && (
                                    isPasswordMatch ? (
                                        <span className="text-green-500">✔</span>
                                    ) : (
                                        <span className="text-red-500">✘</span>
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                )}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p className="mt-4">
                {isSignUp ? "Already have an account?" : "Need an account?"}{' '}
                <span className="text-blue-500 cursor-pointer underline" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Log in' : 'Sign up'}
                </span>
            </p>
        </div>
    );
};

export default Login;