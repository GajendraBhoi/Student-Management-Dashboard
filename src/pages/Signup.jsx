import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app, analytics } from '../services/firebase';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import Loading from '../components/Loading';

const Signup = () => {
    const courses = ['B. Tech', 'BCA', 'M. Tech', 'MCA', 'PHD'];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        course: ''
    });
    const [loading, setLoading] = useState(false);

    // change handler 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // courseselectHandler 
    const handleCourseSelect = (course) => {
        setFormData(prev => ({ ...prev, course }));
    };

    // handleSUbmit function 
    const auth = getAuth(app);
    const db = getFirestore(app);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        // no match 
        if (password !== confirmPassword) {
            console.log("Password do not match");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredential)

            // adding data to database 
            const dbResponse = await addDoc(collection(db, "student"), {
                name: formData.name,
                email: formData.email,
                course: formData.course,

            });

            console.log("Document written with ID: ", dbResponse);

            // Redirect to homepage
            navigate('/');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-96"
            >
                <h1 className="text-2xl font-bold text-blue-700 text-center">
                    Student Management System
                </h1>
                {/* 
                {error && (
                    <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
                )} */}

                {/* Name */}
                <label className="block mt-4">
                    <span className="text-gray-700">Name</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Name"
                        minLength="3"
                        maxLength="30"
                        title="Only letters, numbers or dash"
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                {/* Email */}
                <label className="block mt-4">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                {/* Confirm Password */}
                <label className="block mt-4">
                    <span className="text-gray-700">Confirm Password</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm Password"
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </label>

                {/* Course */}
                <label className="block mt-4">
                    <span className="text-black">Course</span>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                    >
                        <option value="" disabled>-- Select Course --</option>
                        {courses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </label>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 cursor-pointer">
                            Login
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="btn btn-primary mt-5 w-full py-2"
                    >
                        {loading ? 'Signing Up....' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
