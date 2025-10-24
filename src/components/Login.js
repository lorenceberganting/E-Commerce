import {Button, Modal, Form} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {useContext, useState, useEffect} from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login(){
	const navigate = useNavigate();

	const {mode, user, setUser} = useContext(UserContext);

	const [showLogin, setShowLogin] = useState(false);

    const [isActive, setIsActive] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function loginUser(e){
		e.preventDefault();

        console.log(process.env.REACT_APP_API_BASE_URL);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.message === "User logged in successfully"){

                localStorage.setItem('token', data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to the Store :)"
                });

                retrieveUserDetails(data.access);
            } else {
                Swal.fire({
                    title: "Login Error",
                    icon: "error",
                    text: data.message
                });
            }

        }).catch(err => {
            console.log(err);
        })
	}

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    }

    useEffect(() => {

        const validEmail = email.includes("@"); 

        if(email !== '' && password !== '' && validEmail){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);



	const openLogin = () => {
		setShowLogin(true);
	}

	const closeLogin = () => {
    	setShowLogin(false);
    }

    const registerUser = () => {
    	navigate("/register");
    	closeLogin();
    }


	return(
		<>
			<Button onClick={openLogin} className={`bg-${mode.bg} border-${mode.bg} text-${mode.color}`}>Login</Button>

			<Modal show={showLogin} onHide={closeLogin}>
                <Form onSubmit={e => loginUser(e)}>
                    <Modal.Header closeButton>
                        <h1>Sign In</h1>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Enter your email"
                                autoComplete="email"
                                required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required/>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        {isActive ?
                            <Button variant="primary" type="submit" className="me-auto">Login</Button>
                            :
                            <Button variant="primary" type="submit" className="me-auto" disabled>Login</Button>
                        }
                        <span>Don’t have an account yet? <span className="text-primary clickable" onClick={registerUser}>Register</span></span>
                    </Modal.Footer>
                </Form>
                
            </Modal>

		</>
	)
}