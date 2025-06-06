import { Link, useNavigate } from 'react-router-dom';
import { app } from '../services/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";

import { toast } from 'react-toastify';



const Header = () => {
    const navigate = useNavigate();
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
            navigate('/')
            // setTimeout(() => {
            //     navigate('/');
            // }, 1000);

        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <div>
            <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
                <div className="flex items-center">
                    <img src="https://cdn.vectorstock.com/i/500p/82/13/college-student-icon-logo-design-template-isolated-vector-54628213.jpg" alt="Logo" className="h-10 w-10 mr-2" />
                    <span className="text-xl font-bold text-gray-800">Student Portal</span>
                </div>


                {/* Navbar */}
                <nav className="flex gap-4 justify-center items-center">

                    <Link to={user ? "/students" : "/login"}>
                        <button className="btn">Students</button>
                    </Link>

                    <Link to="/addStudent">
                        <button className="btn">Add Student</button>
                    </Link>
                    {user ? (
                        <div className="flex gap-5 justify-center items-center">



                            <Link to="/profile">
                                <button className="btn">View Profile </button>
                            </Link>

                            <Link className="avatar cursor-pointer" to="/profile">
                                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </Link>

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
        </div>
    )
}

export default Header