import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

const AddStudentModal = ({ open, onClose, fetchStudents }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    dateOfAdmission: '',
    bloodGroup: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = 'Valid email is required.';
    if (!formData.phone || formData.phone.length !== 10)
      tempErrors.phone = 'Phone number must be 10 digits.';
    // Add more validation rules as needed
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validate()) {
      try {
        await addDoc(collection(db, 'students'), formData);
        alert('Student added successfully!');
        onClose();
        fetchStudents(); // Refresh the students table
      } catch (error) {
        console.error('Error adding student:', error);
        alert('Error adding student. Please try again.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Class"
          name="class"
          fullWidth
          value={formData.class}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Section"
          name="section"
          fullWidth
          value={formData.section}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Roll Number"
          name="rollNumber"
          fullWidth
          value={formData.rollNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Age"
          name="age"
          type="number"
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          margin="dense"
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Guardian Name"
          name="guardianName"
          fullWidth
          value={formData.guardianName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Guardian Phone"
          name="guardianPhone"
          fullWidth
          value={formData.guardianPhone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Date of Admission"
          name="dateOfAdmission"
          type="date"
          fullWidth
          value={formData.dateOfAdmission}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Blood Group"
          name="bloodGroup"
          fullWidth
          value={formData.bloodGroup}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentModal;
