import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { app } from '../services/firebase';
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Students = () => {
    const courses = ['B. Tech', 'BCA', 'M. Tech', 'MCA', 'PHD'];
    const [formData, setFormData] = useState({
        name: '',
        course: ''
    });

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Change handler 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Course select handler 
    const handleCourseSelect = (course) => {
        setFormData(prev => ({ ...prev, course }));
    };

    // filter or search 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentData = await fetchStudents();
        console.log("currenr data ", currentData)
        const filteredStudents = currentData.filter((student) => {

            if (formData.name && !formData.course) {
                return student.name.toLowerCase().includes(formData.name.toLowerCase());
            }
            else if (!formData.name && formData.course) {
                return formData.course && student.course === formData.course;
            }
            else if (formData.name && formData.course) {
                return (formData.name && student.name.toLowerCase().includes(formData.name.toLowerCase())) &&
                    (formData.course && student.course === formData.course);
            }
            else {
                return true;
            }
        });
        console.log("filtered", filteredStudents);
        setStudents(filteredStudents);
    }


    // fetch students 

    const db = getFirestore(app);
    const fetchStudents = async () => {
        try {
            const studentsCollectionRef = collection(db, 'student');

            const querySnapshot = await getDocs(studentsCollectionRef);

            const studentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            console.log("student data is", studentsData)
            setStudents(studentsData);

            // since the data is not in sync  (trfr returning it)
            return studentsData;
        } catch (err) {
            console.error("Error fetching students: ", err);
            setError("Failed to load students.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const [user, setUser] = useState(null);

    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);

    if (!user) {
        navigate("/login")
    }

    if (loading) {
        return <p>Loading students...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // if (students.length === 0) {
    //     return <p>No students found.</p>;
    // }

    return (
        <div className="min-h-screen w-full bg-gray-100">
            {/* Header */}
            <Header />

            {/* Students List */}
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black ">
                <form className="flex flex-col md:flex-row gap-4 items-center justify-center center" onSubmit={handleSubmit}>

                    {/* Course */}
                    <label className="block ">
                        <span className="text-black">Course</span>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                            className="p-2 w-full border rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                        >
                            <option value="" disabled>-- Select Course --</option>
                            {courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </label>

                    {/* Name Input */}
                    <div className="w-full md:w-3/5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers or dash"
                            className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="w-full md:w-auto mt-6 md:mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                        >
                            Search
                        </button>
                    </div>

                    {/* refresh  */}
                    <FiRefreshCcw className='text-2xl mt-4.5 cursor-pointer on' onClick={() => {

                        // empty the form 
                        setFormData({
                            name: '',
                            course: ''
                        })

                        // refresh the data
                        fetchStudents();
                    }
                    } />
                </form>

                {/* data  */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 mt-6">Student List</h2>
                    {students.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {students.map(student => (
                                <li key={student.id} className="py-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.course}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No students found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Students;
