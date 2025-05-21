import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/report');
        setReport(res.data);
      } catch (err) {
        setReport([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Service Packages Report</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Record #</th>
              <th>Plate Number</th>
              <th>Driver Name</th>
              <th>Package Name</th>
              <th>Package Description</th>
              <th>Service Date</th>
              <th>Amount Paid</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {report.map((row) => (
              <tr key={row.RecordNumber}>
                <td>{row.RecordNumber}</td>
                <td>{row.PlateNumber}</td>
                <td>{row.DriverName}</td>
                <td>{row.PackageName}</td>
                <td>{row.PackageDescription}</td>
                <td>{row.ServiceDate ? new Date(row.ServiceDate).toLocaleDateString() : ''}</td>
                <td>{row.AmountPaid ? row.AmountPaid : ''}</td>
                <td>{row.PaymentDate ? new Date(row.PaymentDate).toLocaleDateString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Report;