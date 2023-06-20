import React from "react";
import { AppBar, Toolbar, Typography, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";

const AppBarComponent = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Welcome to Dangerous Items Detector
      </Typography>
      <Select value="home">
        <MenuItem key="home" value="home" component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem key="safe" value="safe" component={Link} to="/safe">
          Safe Items
        </MenuItem>
        <MenuItem key="gun" value="gun" component={Link} to="/">
          Gun
        </MenuItem>
        <MenuItem key="knife" value="knife" component={Link} to="/">
          Knife
        </MenuItem>
        <MenuItem key="wrench" value="wrench" component={Link} to="/">
          Wrench
        </MenuItem>
        <MenuItem key="pliers" value="pliers" component={Link} to="/">
          Pliers
        </MenuItem>
        <MenuItem key="scissors" value="scissors" component={Link} to="/">
          Scissors
        </MenuItem>
        <MenuItem key="upload" value="upload" component={Link} to="/upload">
          Upload Image
        </MenuItem>
      </Select>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
