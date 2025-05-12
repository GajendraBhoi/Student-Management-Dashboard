import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from '../services/firebase'; // adjust the path as per your project

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log("User logged in:", userCredential);

            // Redirect to homepage
            navigate("/");
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100 text-black">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-2xl font-bold text-blue-700 text-center">Student Management System</h1>

                {/* Email */}
                <label className="block mt-4">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abc@gmail.com"
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                {/* Password */}
                <label className="block mt-4">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength="8"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                {/* Buttons */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-blue-500 cursor-pointer">Sign up</Link>
                    </p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary mt-5 w-full"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
