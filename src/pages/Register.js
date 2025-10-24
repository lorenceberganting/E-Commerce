import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register(){
	const {user,mode} = useContext(UserContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isActive, setIsActive] = useState('');
	

	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password);
	console.log(confirmPassword);


	function registerUser(e){
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`,{
			method: 'POST',
			headers: {
				"Content-Type": "Application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "User registered successfully"){
				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');
				setConfirmPassword('');

				Swal.fire({
                    title: "Register Successful",
                    icon: "success",
                    text: data.message
                });

			}
			else if(data.message === "Invalid email format"){
				Swal.fire({
                    title: "Register Error",
                    icon: "error",
                    text: data.message
                });

			}
			else if(data.message === "Mobile number is invalid"){
				Swal.fire({
                    title: "Register Error",
                    icon: "error",
                    text: data.message
                });
			}
			else if(data.message === "Password must be atleast 8 characters long"){
				Swal.fire({
                    title: "Register Error",
                    icon: "error",
                    text: data.message
                });

			}
			else{
				Swal.fire({
                    title: "Register Error",
                    icon: "error",
                    text: data.message
                });
			}
		}) 
	}

	useEffect(()=> {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" ) && (password === confirmPassword) && mobileNo.length === 11){
			if(password !== confirmPassword){
				alert("Password Not Match");
			}
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])

	return(
		
		<section className={`pt-5 text-${mode.color} bg-${mode.bg} container--full`}>
			<Form onSubmit={(e) => registerUser(e)} className={`my-5 pt-5`}>
				<table className={`bg-${mode.bg} border-${mode.color} rounded`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: "gray", width:"30%", margin: "auto", marginTop: "5", border:"1px solid black", }}>

			     	<h1 className={`my-5 mx-5 text-center text-${mode.color}`}>Register</h1>
						
				   <Form.Group className="textbox">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter First Name" 
                            required 
                            value={firstName} 
                            onChange={e => setFirstName(e.target.value)} 
                        />
                    </Form.Group>
                    
                    <Form.Group className="textbox">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Last Name" 
                            required 
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)} 
                        />
                    </Form.Group>
                    
                    <Form.Group className="textbox">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </Form.Group>
                    
                    <Form.Group className="textbox">
                        <Form.Label style={{ textAlign: "flex-start"}}>Mobile No:</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter 11 Digit No." 
                            required 
                            value={mobileNo} 
                            onChange={e => setMobileNo(e.target.value)} 
                        />
                    </Form.Group>
                    
                    <Form.Group className="textbox">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </Form.Group>
                    
                    <Form.Group className="textbox">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password" 
                            required 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                    </Form.Group>
		            <div style={{display: 'flex', flexDirection: 'column'}}>
				    	{/*conditionally render submit button based on isActive state*/}
				        { isActive ?
				        	<Button variant="primary" type="submit" id="submitBtn" className="my-3">Submit</Button>
				        	:
				        	<Button variant="primary" type="submit" id="submitBtn" className="my-3" disabled>Submit</Button>
				        }
				    </div>
			    </table>
			</Form>
		</section>
	)
}
