import {Nav, Navbar, Button, Container} from 'react-bootstrap';

import {Link, NavLink} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../UserContext';

import Login from './Login';

export default function AppNavBar(){

	const {user, mode, setMode} = useContext(UserContext);

	const darkMode = () => {
		const mode = {
			bg: "dark",
    		color: "light"
		}
		setMode(mode);
		localStorage.setItem('modeTheme', JSON.stringify(mode));
		document.documentElement.style.setProperty('--background-color', "#222529");
	}

	const lightMode = () => {
		const mode = {
			bg: "light",
    		color: "dark"
		}
		setMode(mode);
		localStorage.setItem('modeTheme', JSON.stringify(mode));
		document.documentElement.style.setProperty('--background-color', "#F8F9FA");
	}

	return (	
		<Navbar bg={mode.bg} data-bs-theme={mode.bg} fixed="top" expand="lg">
	        <Container className="justify-content-center text-center">
	          <Navbar.Toggle aria-controls="basic-navbar-nav" />
	          <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="mx-auto">
		          	<Navbar.Brand as={NavLink} to="/" exact="true" className="mx-2">
		          		<img
			              src="./LORO.svg"
			              width="100"
			              height="30"
			              className="d-inline-block align-top"
			              alt="React Bootstrap logo"
			            />
		          	</Navbar.Brand>
		            <Nav.Link as={NavLink} to="/" exact="true" className="mx-2">Home</Nav.Link>

		            <Nav.Link as={Link} to="/products" className="mx-2">Store</Nav.Link>
		            { (user.id !== null) ?
		            	(user.isAdmin) ?
		            		<>
			            		<Nav.Link as={Link} to="products/add-product" className="mx-2">Add Item</Nav.Link>
			            		<Nav.Link as={Link} to="/logout" className="mx-2">Logout</Nav.Link>
			            		<Nav.Link as={Link} to="/orders" className="mx-2">Orders</Nav.Link>
		            		</>
		            		:
		            		<>
		            			<Nav.Link as={Link} to="/cart" className="mx-2">Cart</Nav.Link>
			            		<Nav.Link as={Link} to="/orders" className="mx-2">Orders</Nav.Link>
			            		<Nav.Link as={Link} to="/logout" className="mx-2">Logout</Nav.Link>
		            		</>

		            	:
		            	<>      
			            	<Login />
			            	<Nav.Link as={Link} to="/register" className="mx-2">Register</Nav.Link>
		            	</>
		            }          
	                { (mode.bg === "light") ?
	                	<Button variant={mode.color} size="sm" className="mx-2" onClick={darkMode}>Dark Mode</Button>
	                	:
	                	<Button variant={mode.color} size="sm" className="mx-2" onClick={lightMode}>Light Mode</Button>
	                }
		          </Nav>
	          </Navbar.Collapse>
	        </Container>
	    </Navbar>  
	)
}