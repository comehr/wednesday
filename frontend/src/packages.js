import React, { useState } from 'react';
import axios from 'axios';

const Packages = () => {
  const [form, setForm] = useState({
    PackageName: '',
    PackageDescription: '',
    PackagePrice: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/packages', form); // Adjust port if needed
      setMessage('Package added successfully!');
      setForm({
        PackageName: '',
        PackageDescription: '',
        PackagePrice: ''
      });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Package</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Package Name</label>
          <input
            type="text"
            className="form-control"
            name="PackageName"
            value={form.PackageName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Package Description</label>
          <input
            type="text"
            className="form-control"
            name="PackageDescription"
            value={form.PackageDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Package Price</label>
          <input
            type="number"
            className="form-control"
            name="PackagePrice"
            value={form.PackagePrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default Packages;