import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}){

	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
    	fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
    	.then(res => res.json())
    	.then(data => {
    		console.log(data)
    		setProductId(data._id);
    		setName(data.name);
    		setDescription(data.description);
    		setPrice(data.price);
    	})
    	setShowEdit(true);
    }

    const closeEdit = () => {
    	setShowEdit(false);
    	setName('');
    	setDescription('');
    	setPrice(0);
    }

    const editCourse = (e, productId) => {
    	e.preventDefault();

    	fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
    		method: 'PATCH',
    		headers: {
    			'Content-Type': 'application/json',
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		},
    		body: JSON.stringify({
    			name: name,
    			description: description,
    			price: price
    		})
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data)
    		if(data.message === "Product updated successfully"){
    			Swal.fire({
	                title: "Success!",
	                icon: "success",
	                text: data.message
	            });
	            closeEdit();
	            fetchData();
    		} else {
    			Swal.fire({
	                title: "Error",
	                icon: "error",
	                text: data.message
	            });
    		}
    	})
    }

    return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editCourse(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={price} 
                                onChange={e => setPrice(e.target.value)} 
                                required/>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
                
            </Modal>
		</>
	)
}