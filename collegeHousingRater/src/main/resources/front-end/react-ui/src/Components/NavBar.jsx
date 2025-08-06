import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

//NavBar Component
function NavBar() {
    return (
        //Bootstrap NavBar
        //This is the top navigation bar for the application
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            {/* Container to keep content aligned and positioned */}
            {/* App ame and logo */}
            <Container>
                {/* Logo/name, clicking it returns to home page*/}
                <Navbar.Brand className="navbar-brand" href="#home">Rate Your College Housing</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                <Nav>
                    {/* Sign-in link */}
                    <Nav.Link className="navbar-link" eventKey={2} href="#sign-in">
                    Sign-In
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default NavBar;