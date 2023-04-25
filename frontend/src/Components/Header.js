import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Make navbar cover the entire width of the screen
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import { sessionService } from 'redux-react-session';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


// Header component
function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in, if so, set loggedIn to true
  useEffect(()=>{
    sessionService.loadSession().then(currentSession => {
      console.log(currentSession)
      setLoggedIn(true);
    })
    .catch(err => {
      console.log(err)
      setLoggedIn(false);
    })
  })

  // Logout function
  const logout = () => {
    sessionService.deleteUser();
    sessionService.deleteSession();
    //window.location.reload(false);
    setLoggedIn(false);
  }

  return (
    <Navbar bg="light" expand="xl">
        <Navbar.Brand href="/">
        <img src={logo} alt="Logo" width="30px" height="30px"/>
        Market Intelligence Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" me-auto>
          <Nav className="me-auto">
            <Nav.Link href="/reviews">Reviews</Nav.Link>
            <Nav.Link href="/regional">Compare Prices by Region</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {
                !loggedIn? 
                <NavDropdown.Item href="/login">Login</NavDropdown.Item> :
                <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
              }
              {
                !loggedIn? 
                null :
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}


export default Header;