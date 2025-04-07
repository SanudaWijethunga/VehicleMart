import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import SignUp from './pages/signUp/SignUp';
import AddVehicle from './pages/AddVehicle/AddVehicle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/add-vehicle' element={<AddVehicle />} />
      </Routes>
    </Router>
  );
}


export default App;
