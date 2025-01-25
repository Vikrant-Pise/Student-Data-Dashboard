import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { People, ExitToApp } from "@mui/icons-material"; 


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#3f51b5", 
          color: "white", 
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", marginBottom: "20px" }}>
          Admin Dashboard
        </Typography>
      </Box>

      <List>
        <ListItem button onClick={() => navigate("/students")}>
          <ListItemIcon>
            <People sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Students" sx={{ color: "white" }} />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
