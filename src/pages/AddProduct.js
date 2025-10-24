import {Button, Modal, Form} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {useContext, useState, useEffect} from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

import imageCompression from 'browser-image-compression';

export default function AddProduct(){

	const navigate = useNavigate();

	const {user, mode} = useContext(UserContext);

	const [image, setImage] = useState("");
	const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(name !== '' && description !== '' && price !== 0 && image !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [image, name, description, price]);

    function createItem(e){
    	e.preventDefault();

    	let token = localStorage.getItem('token');

    	let itemData = {
    		name: name,
    		description: description,
    		price: price,
    		image: image
    	}

    	console.log(itemData);
    	console.log(token);

    	fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(itemData)
        })
        .then(res => res.json())
        .then(data => {
        	console.log(data);
        	if (data.message === "Product Added Successfully"){
				Swal.fire({
					title: "Product Successful",
					icon: "success",
					text: data.message
                });
                navigate("/products");

        	} else {
        		 Swal.fire({
                    title: "Product Error",
                    icon: "error",
                    text: data.message
                });
        	}
        }).catch(error => {
        	console.error(error);
        })

    }

    async function convertToBase64(e){
    	console.log(e);

        const file = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = error => {
                console.log("Error: ", error);
            };
        } catch (error) {
            console.log(error.message);
        } 	
    }

	return(
		(user.isAdmin) ?
			<>
				<section className={`p-5 my-5 bg-${mode.bg} text-${mode.color}`}> 
					<h1 className="my-5 text-center">Add Item</h1>
	                <Form onSubmit={e => createItem(e)} className="my-5 p-5">
	                    <Form.Group>
	                        <Form.Label>Item Name:</Form.Label>
	                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
	                    </Form.Group>
	                    <Form.Group>
	                        <Form.Label>Item Description:</Form.Label>
	                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
	                    </Form.Group>
	                    <Form.Group>
	                        <Form.Label>Item Price:</Form.Label>
	                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
	                    </Form.Group>
	                    <Form.Group className="p-5 bg-white text-dark my-2 border rounded">
	                        <input accept="image/*" type="file" placeholder="images" 
	                        onChange={convertToBase64}/>
	                        {image=="" || image==null?"": <img width={100} height={100} src={image}/>}
	                        
	                    </Form.Group>
	                    
	                    { isActive ? 
	                        <Button variant="primary" type="submit" id="submitBtn" className='my-2'> 
	                            Submit
	                        </Button>
	                        : 
	                        <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>
	                            Submit
	                        </Button>
	                    }
	                </Form>
				</section>
			</>
			:
			<Navigate to="/products" />
	)
}