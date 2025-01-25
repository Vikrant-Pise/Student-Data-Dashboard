import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import { auth } from "../firebaseConfig"; // Firebase authentication
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase method

const Login = () => {
  const navigate = useNavigate(); // For redirecting to the students page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Firebase login method
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students"); // Redirect to the students page after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          border: "2px solid black", // Black border
          borderRadius: "8px", // Rounded corners
          backgroundColor: "white", // Background color for the box
          width: "100%",
          maxWidth: "400px", // Limit the width of the box
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="password"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
