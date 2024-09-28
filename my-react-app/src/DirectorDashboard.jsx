import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('https://backend1-nbbb.onrender.com/users?role=Student');
        const staffResponse = await axios.get('https://backend1-nbbb.onrender.com/users?role=Staff');
        setStudents(studentsResponse.data);
        setStaff(staffResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const addStaff = async (staffData) => {
    try {
      await axios.post('https://backend1-nbbb.onrender.com/users', staffData);
      alert('Staff added');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Director Dashboard</h2>
      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.grade} - Balance: {student.balance}
          </li>
        ))}
      </ul>

      <h3>Add Staff</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStaff({
            name: e.target.name.value,
            email: e.target.email.value,
            role: 'Staff'
          });
        }}
      >
        <input name="name" placeholder="Staff Name" required />
        <input name="email" placeholder="Email" required />
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default DirectorDashboard;
