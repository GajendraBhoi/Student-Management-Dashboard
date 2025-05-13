import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { app } from '../services/firebase';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
    const courses = ['B. Tech', 'BCA', 'M. Tech', 'MCA', 'PhD'];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Generic change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // add student 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const db = getFirestore(app);
        try {
            const res = await addDoc(collection(db, 'student'), {
                name: formData.name,
                email: formData.email,
                course: formData.course,
            });
            console.log("added student ", res);


            setFormData({ name: '', email: '', course: '' });
        } catch (err) {
            console.error('Error adding student:', err);
            setError('Failed to add student.');
        } finally {
            setLoading(false);
        }
    };

    // Auth check
    const auth = getAuth(app);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (!user) navigate('/login');
            setLoading(false);
        });
        return () => unsub();
    }, [auth, navigate]);

    if (loading) return <p className="text-black">Loading students...</p>;
    if (error) return <p className="text-black">{error}</p>;

    return (
        <div className="w-full bg-gray-100">
            <Header />

            <div className="flex justify-center items-center py-10">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-black text-center">
                        Student Management System
                    </h1>

                    {/* Name */}
                    <label className="block mt-4">
                        <span className="text-black">Name</span>
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
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                        />
                    </label>

                    {/* Email */}
                    <label className="block mt-4">
                        <span className="text-black">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="abc@gmail.com"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary mt-5 w-full py-2 font-semibold rounded-lg text-white"
                        >
                            {loading ? 'Adding Student...' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
