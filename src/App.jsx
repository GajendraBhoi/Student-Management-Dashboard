import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter here
import Homepage from './pages/Homepage'; // Import your Homepage component
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
