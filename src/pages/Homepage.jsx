
import Header from '../components/Header';

const Homepage = () => {
    return (
        <div className="h-screen w-full bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Student Dashboard</h1>
                <p className="text-lg text-gray-600">Made by : Gajendra </p>
            </main>



        </div>
    );
};

export default Homepage;
