import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../services/firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Profile = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);
    const navigate = useNavigate();

    const auth = getAuth(app);
    const db = getFirestore(app);

    // logged user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setLoggedUser(firebaseUser);
        });
        return () => unsubscribe(); // This is the cleanup function of useEffect.
        // It ensures that when your component unmounts, Firebase stops listening for auth changes.
    }, []);


    // matching 
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!loggedUser) return;

            setLoading(true);
            try {
                const studentDB = collection(db, 'student');
                const snapshot = await getDocs(studentDB);
                const students = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const matchedStudent = students.find(
                    student => student.email === loggedUser.email
                );

                setStudentData(matchedStudent);
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [loggedUser]);

    if (loading) return <Loading />;
    if (!studentData) return <p>No student data found.</p>;
    if (!loggedUser) {
        navigate("/login")
    }


    return (
        <div className='bg-white min-h-screen'>
            <Header />

            <div className='flex justify-center items-center h-auto mt-25'>
                <div className="flex flex-col gap-7 items-center w-1/2 p-8 rounded-lg shadow-md">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={"https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"} />
                        </div>
                    </div>

                    <div className="text-black text-center flex flex-col gap-5">
                        <h1 className="text-2xl font-bold mb-2">{studentData.name}</h1>
                        <p className="text-lg mb-1">Email: {studentData.email}</p>
                        <p className="text-lg mb-1">Course: {studentData.course}</p>
                        <p className="text-lg mb-1">College: {studentData.college || "NIT Raipur"}</p>
                        <p className="text-lg mb-1">College: {studentData.branch || "CSE"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
