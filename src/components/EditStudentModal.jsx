// src/components/EditStudentModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const EditStudentModal = ({ open, onClose, student, fetchStudents }) => {
  const [name, setName] = useState(student?.name || "");
  const [className, setClassName] = useState(student?.class || "");
  const [section, setSection] = useState(student?.section || "");
  const [rollNumber, setRollNumber] = useState(student?.rollNumber || "");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setClassName(student.class);
      setSection(student.section);
      setRollNumber(student.rollNumber);
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentRef = doc(db, "students", student.id);
    await updateDoc(studentRef, {
      name,
      class: className,
      section,
      rollNumber,
    });
    fetchStudents();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 2, backgroundColor: "white", margin: "100px auto", maxWidth: 400 }}>
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditStudentModal;
