import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    admission_number: '',
    grade: '',
  });
  const [newGallery, setNewGallery] = useState({
    name: '',
    description: '',
    image_urls: '',
  });

  // Fetch students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users?role=Student');
      setStudents(response.data.users);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users?role=Teacher');
      setTeachers(response.data.users);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // Fetch gallery
  const fetchGallery = async () => {
    try {
      const response = await axios.get('/gallery');
      setGallery(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  // Add a new student
  const addStudent = async () => {
    try {
      await axios.post('/users', newStudent);
      setNewStudent({
        name: '',
        email: '',
        password: '',
        role: 'Student',
        admission_number: '',
        grade: '',
      });
      fetchStudents(); // Refresh students list
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Add new gallery images
  const addGallery = async () => {
    try {
      const imageUrls = newGallery.image_urls.split(','); // Convert string to array
      await axios.post('/gallery', {
        ...newGallery,
        image_urls: imageUrls,
      });
      setNewGallery({
        name: '',
        description: '',
        image_urls: '',
      });
      fetchGallery(); // Refresh gallery
    } catch (error) {
      console.error('Error adding gallery:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchGallery();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="section">
        <h3>Students</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.admission_number} - {student.grade}
            </li>
          ))}
        </ul>

        <div>
          <h4>Add New Student</h4>
          <input
            type="text"
            id="student-name"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            type="text"
            id="student-email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
          />
          <input
            type="password"
            id="student-password"
            name="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) =>
              setNewStudent({ ...newStudent, password: e.target.value })
            }
          />
          <input
            type="text"
            id="student-admission-number"
            name="admission_number"
            placeholder="Admission Number"
            value={newStudent.admission_number}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                admission_number: e.target.value,
              })
            }
          />
          <input
            type="text"
            id="student-grade"
            name="grade"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={(e) =>
              setNewStudent({ ...newStudent, grade: e.target.value })
            }
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
      </div>

      <div className="section">
        <h3>Teachers</h3>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>{teacher.name}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Gallery</h3>
        <ul>
          {gallery.map((g) => (
            <li key={g.id}>
              <strong>{g.name}</strong>
              <p>{g.description}</p>
              <div>
                {g.image_urls.map((url, index) => (
                  <img key={index} src={url} alt={g.name} />
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div>
          <h4>Add New Gallery</h4>
          <input
            type="text"
            id="gallery-name"
            name="name"
            placeholder="Gallery Name"
            value={newGallery.name}
            onChange={(e) =>
              setNewGallery({ ...newGallery, name: e.target.value })
            }
          />
          <input
            type="text"
            id="gallery-description"
            name="description"
            placeholder="Description"
            value={newGallery.description}
            onChange={(e) =>
              setNewGallery({ ...newGallery, description: e.target.value })
            }
          />
          <input
            type="text"
            id="gallery-image-urls"
            name="image_urls"
            placeholder="Image URLs (comma separated)"
            value={newGallery.image_urls}
            onChange={(e) =>
              setNewGallery({ ...newGallery, image_urls: e.target.value })
            }
          />
          <button onClick={addGallery}>Add to Gallery</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
