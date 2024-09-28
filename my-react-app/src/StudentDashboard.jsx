import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({ userId }) => {
  const [assignments, setAssignments] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const assignmentsResponse = await axios.get(`https://backend1-nbbb.onrender.com/assignments?grade=${userId}`);
        const balanceResponse = await axios.get(`https://backend1-nbbb.onrender.com/students/${userId}/balance`);
        setAssignments(assignmentsResponse.data);
        setBalance(balanceResponse.data.balance);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudentData();
  }, [userId]);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Your Balance: {balance}</p>
      <h3>Your Assignments:</h3>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            {assignment.name} - {assignment.description}
            <button>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
