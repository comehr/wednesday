import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [form, setForm] = useState({
    RecordNumber: '',
    AmountPaid: '',
    PaymentDate: ''
  });
  const [serviceRecords, setServiceRecords] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch service records for dropdown
  useEffect(() => {
    const fetchServiceRecords = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/servicepackages');
        setServiceRecords(res.data);
      } catch (err) {
        setServiceRecords([]);
      }
    };
    fetchServiceRecords();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', form);
      setMessage('Payment added successfully!');
      setForm({
        RecordNumber: '',
        AmountPaid: '',
        PaymentDate: ''
      });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Payment</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Service Record Number</label>
          <select
            className="form-control"
            name="RecordNumber"
            value={form.RecordNumber}
            onChange={handleChange}
            required
          >
            <option value="">Select a service record</option>
            {serviceRecords.map(record => (
              <option key={record.RecordNumber} value={record.RecordNumber}>
                {record.RecordNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Amount Paid</label>
          <input
            type="number"
            className="form-control"
            name="AmountPaid"
            value={form.AmountPaid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Payment Date</label>
          <input
            type="date"
            className="form-control"
            name="PaymentDate"
            value={form.PaymentDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Payment</button>
      </form>
    </div>
  );
};

export default Payment;