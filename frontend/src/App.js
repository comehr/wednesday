import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Car from './car';
import Packages from './packages';
import ServicePackage from './ServicePackage';
import Payment from './Payment'; 
import Report from './Report'; // or './components/Report'
// Placeholder components for each route
// const Car = () => <h2 className="text-center mt-4">Car Page</h2>;
// const Packages = () => <h2 className="text-center mt-4">Packages Page</h2>;
// const ServicePackage = () => <h2 className="text-center mt-4">Service Package Page</h2>;
// const Payment = () => <h2 className="text-center mt-4">Payment Page</h2>;
// const Reports = () => <h2 className="text-center mt-4">Reports Page</h2>;
const Logout = () => <h2 className="text-center mt-4">Logout Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/car" element={<Car />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/service-package" element={<ServicePackage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Car />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;