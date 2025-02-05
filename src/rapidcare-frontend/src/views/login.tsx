import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { setLoginState } from '../redux/appActions';
import { generateHealthcareProfessionalMockData } from '../mockData/mockData';
import './styles.css';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    // Validate admin email structure
    const validateAdminEmail = (email: string): boolean => {
        return email.startsWith('admin') && email.endsWith('@rapidcare.ca');
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); 

        try {
            if (isSignUp) {
                // Sign-Up Logic
                if (!validateAdminEmail(email)) {
                    setError('Invalid email format.');
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('Account created for:', userCredential.user.email);
                alert('Account successfully created! You can now log in.');
                setIsSignUp(false); 
            } else {
                // Login Logic
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                if (user.email && validateAdminEmail(user.email)) {
                    console.log('Admin authenticated');

                    const mockData = generateHealthcareProfessionalMockData();
                    console.log('Generated Mock Data:', mockData);

                    dispatch(
                        setLoginState(
                            true,
                            true,
                            mockData.healthNetworkAdmin, 
                            mockData.healthcareProfessional 
                        )
                    );

                    // Redirect to home
                    navigate('/home');
                    console.log('Navigating to /home');
                } else {
                    setError('Unauthorized user. Only admins can log in.');
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
            <h2>{isSignUp ? 'Sign Up' : 'Admin Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter admin email"
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
                {error && <p className="error">{error}</p>}
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                <span
                    className="toggle-link"
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {isSignUp ? 'Log in' : 'Sign up'}
                </span>
            </p>
        </div>
    );
};

export default Login;
