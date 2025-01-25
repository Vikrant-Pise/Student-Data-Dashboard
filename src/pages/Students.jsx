import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal"; // Assuming you have an EditStudentModal component
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing
  const [currentStudent, setCurrentStudent] = useState(null); // For storing student data to edit

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Handle delete student
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents(); // Refresh the student list after deletion
  };

  // Handle edit student
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  };

  // Handle view student
  const handleView = (student) => {
    alert(`Student Details: ${JSON.stringify(student)}`); // You can create a more sophisticated modal for this
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{
      display: "flex",
      // background: "url('https://www.example.com/your-image.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      height: "100vh"  
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        borderRadius: "8px"
      }}>
        <h1>Students Page</h1>
        
        
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add Student
        </Button>

       
        <AddStudentModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchStudents={fetchStudents}
        />

       
        <EditStudentModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          student={currentStudent}
          fetchStudents={fetchStudents}
        />

       
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="students table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                   
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleView(student)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Students;
