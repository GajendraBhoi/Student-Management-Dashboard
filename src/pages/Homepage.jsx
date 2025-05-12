import { Link } from 'react-router-dom';
import { app } from '../services/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Homepage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);


    // logout 
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    // loading 
    if (loading) return <div>Loading...</div>;

    return (
        <div className="h-screen w-full bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
                <div className="flex items-center">
                    <img src="https://cdn.vectorstock.com/i/500p/82/13/college-student-icon-logo-design-template-isolated-vector-54628213.jpg" alt="Logo" className="h-10 w-10 mr-2" />
                    <span className="text-xl font-bold text-gray-800">Student Portal</span>
                </div>


                {/* Navbar */}
                <nav className="flex gap-4 justify-center items-center">

                    <Link to="/dashboard">
                        <button className="btn btn-primary">Dashboard</button>
                    </Link>
                    {user ? (
                        <div className="flex gap-5 justify-center items-center">


                            <Link to="/dashboard">
                                <button className="btn btn-primary">View Profile </button>
                            </Link>

                            <div className="avatar cursor-pointer">
                                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </div>

                            <div>
                                <IoIosLogOut className='text-black text-4xl ml-4 cursor-pointer' onClick={handleLogout} />
                            </div>
                        </div>

                    ) : (
                        <div className='flex gap-4'>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary">Sign up</button>
                            </Link>

                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Student Dashboard</h1>
                <p className="text-lg text-gray-600">Made by : Gajendra </p>
            </main>

            <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
};

export default Homepage;
