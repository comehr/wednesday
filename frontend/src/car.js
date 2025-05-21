import React, { useState } from 'react';
import axios from 'axios';

const Car = () => {
  const [form, setForm] = useState({
    PlateNumber: '',
    CarType: '',
    CarSize: '',
    DriverName: '',
    PhoneNumber: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cars', form); // Use your backend port
      setMessage('Car added successfully!');
      setForm({
        PlateNumber: '',
        CarType: '',
        CarSize: '',
        DriverName: '',
        PhoneNumber: ''
      });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Car</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Plate Number</label>
          <input type="text" className="form-control" name="PlateNumber" value={form.PlateNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Car Type</label>
          <input type="text" className="form-control" name="CarType" value={form.CarType} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Car Size</label>
          <input type="text" className="form-control" name="CarSize" value={form.CarSize} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Driver Name</label>
          <input type="text" className="form-control" name="DriverName" value={form.DriverName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" className="form-control" name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Car</button>
      </form>
    </div>
  );
};

export default Car;