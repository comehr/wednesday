import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicePackage = () => {
  const [form, setForm] = useState({
    PlateNumber: '',
    PackageNumber: '',
    ServiceDate: ''
  });
  const [packages, setPackages] = useState([]);
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch packages and cars on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (err) {
        setPackages([]);
      }
    };
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        setCars(res.data);
      } catch (err) {
        setCars([]);
      }
    };
    fetchPackages();
    fetchCars();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/servicepackage', form);
      setMessage('Service package added successfully!');
      setForm({
        PlateNumber: '',
        PackageNumber: '',
        ServiceDate: ''
      });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Service Package</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Plate Number</label>
          <select
            className="form-control"
            name="PlateNumber"
            value={form.PlateNumber}
            onChange={handleChange}
            required
          >
            <option value="">Select a plate number</option>
            {cars.map(car => (
              <option key={car.PlateNumber} value={car.PlateNumber}>
                {car.PlateNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Package</label>
          <select
            className="form-control"
            name="PackageNumber"
            value={form.PackageNumber}
            onChange={handleChange}
            required
          >
            <option value="">Select a package</option>
            {packages.map(pkg => (
              <option key={pkg.PackageNumber} value={pkg.PackageNumber}>
                {pkg.PackageName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Service Date</label>
          <input
            type="date"
            className="form-control"
            name="ServiceDate"
            value={form.ServiceDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Service Package</button>
      </form>
    </div>
  );
};

export default ServicePackage;