import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"; 

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
     
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students"); 
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
          border: "2px solid black", 
          borderRadius: "8px",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "400px",
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
