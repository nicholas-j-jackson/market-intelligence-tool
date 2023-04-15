import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Make navbar cover the entire width of the screen
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';



function Header() {
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
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;