import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BursarDashboard = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('https://backend1-nbbb.onrender.com/users?role=Student');
        const paymentsResponse = await axios.get('https://backend1-nbbb.onrender.com/payments');
        setStudents(studentsResponse.data);
        setPayments(paymentsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

    const addPayment = async (paymentData) => {
      try {
        await axios.post('https://backend1-nbbb.onrender.com/payments', paymentData);
        alert('Payment added');
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div>
        <h2>Bursar Dashboard</h2>
        <h3>Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.grade} - Balance: {student.balance}
            </li>
          ))}
        </ul>

        <h3>Add Payment</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPayment({
              studentId: e.target.studentId.value,
              amount: e.target.amount.value,
            });
          }}
        >
          <select name="studentId" required>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} (Grade: {student.grade})
              </option>
            ))}
          </select>
          <input name="amount" type="number" placeholder="Amount" required />
          <button type="submit">Add Payment</button>
        </form>
      </div>
    );
    };

    export default BursarDashboard;

    