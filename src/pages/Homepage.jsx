
import Header from '../components/Header';
import image from '../assets/smsImage.gif'
const Homepage = () => {
    return (
        <div className="h-screen w-full bg-white">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex h-auto">
                <div className='w-1/2'>
                    <img src={image} alt="image" className='p-9 select-none' draggable="false" />
                </div>
                <div className="w-full md:w-1/2 text-center flex justify-center items-center flex-col">
                    <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-500 mb-6 drop-shadow-md">
                        Welcome to the Student Dashboard
                    </h1>
                    <p className="text-xl  text-black bg-gradient-to-r ">
                        Made by: <span className="font-semibold">Gajendra</span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Homepage;
