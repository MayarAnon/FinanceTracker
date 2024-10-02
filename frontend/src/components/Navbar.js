import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Navbar.css";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "x";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderNavLinks = () => (
    <List>
      <ListItem button component={NavLink} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={NavLink} to="/goals">
        <ListItemText primary="Goals" />
      </ListItem>
      <ListItem button component={NavLink} to="/budgets">
        <ListItemText primary="Budgets" />
      </ListItem>
      <ListItem button component={NavLink} to="/transactions">
        <ListItemText primary="Transactions" />
      </ListItem>
      <ListItem button component={NavLink} to="/fixed-costs">
        <ListItemText primary="Fixed Costs" />
      </ListItem>
    </List>
  );

  return (
    <div className="navbar">
      <div className="navbar-user">
        <span>{userEmail.substring(0, 5)}...</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <nav className="desktop-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals" activeClassName="active">
              Goals
            </NavLink>
          </li>
          <li>
            <NavLink to="/budgets" activeClassName="active">
              Budgets
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" activeClassName="active">
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/fixed-costs" activeClassName="active">
              Fixed Costs
            </NavLink>
          </li>
        </ul>
      </nav>
      <IconButton
        edge="start"
        className="menu-button"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: "block", md: "none" } }} // Nur auf kleinen Bildschirmen anzeigen
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderNavLinks()}
      </Drawer>
    </div>
  );
}

export default Navbar;
