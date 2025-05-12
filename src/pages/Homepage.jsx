import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="h-screen w-full bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
                <div className="flex items-center">
                    <img src="https://cdn.vectorstock.com/i/500p/82/13/college-student-icon-logo-design-template-isolated-vector-54628213.jpg" alt="Logo" className="h-10 w-10 mr-2" />
                    <span className="text-xl font-bold text-gray-800">Student Portal</span>
                </div>

                {/* Navbar */}
                <nav className="flex gap-4">
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn btn-primary">Sign up</button>
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Student Dashboard</h1>
                <p className="text-lg text-gray-600">Made by : Gajendra </p>
            </main>
        </div>
    );
};

export default Homepage;
