import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter here
import Homepage from './pages/Homepage'; // Import your Homepage component
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddStudent from './pages/AddStudent';
import Students from './pages/Students';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<Students />} />
        <Route path='/addStudent' element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
