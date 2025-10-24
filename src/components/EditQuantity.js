import {Button, Modal, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';

export default function EditQuantity({productId, quantity, fetchCartData}){
	const [count, setCount] = useState();
	const [showEdit, setShowEdit] = useState(false);

	function addQuantity(){
		setCount(count + 1);
	}

	function subQuantity(){
		if(count > 1){
			setCount(count - 1);
		}
	}

	function updateCartQuantity(e, productId){
		e.preventDefault();
		console.log(productId);
		console.log(count);
		const cartData = {
			cartItems: [
				{
					productId: productId,
					quantity: count,
				}
			]
		}
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
    		method: 'PATCH',
    		headers: {
    			'Content-Type': 'application/json',
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		},
    		body: JSON.stringify(cartData)
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data)
    		if(data.message === "Item Quantity Updated Successfully"){
    			Swal.fire({
	                title: "Success!",
	                icon: "success",
	                text: data.message
	            });
	            closeEdit();
	            fetchCartData();
    		} else {
    			Swal.fire({
	                title: "Error",
	                icon: "error",
	                text: data.message
	            });
    		}
    	})
	}
    const openEdit = (productId) => {
    	setShowEdit(true);
    }

    const closeEdit = () => {
    	setShowEdit(false);
    }

    useEffect(() => {
    	setCount(quantity)
    },[quantity])

    return(
    	<>
    		<Button variant="primary" size="sm" onClick={() => openEdit(productId)}>Edit Quantity</Button>

    		<Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => updateCartQuantity(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Quantity</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <div className="d-flex">
								<Button variant="dark" onClick={subQuantity}>-</Button>
									<h4 className="px-5">{count}</h4>
								<Button variant="dark" onClick={addQuantity}>+</Button>
							</div>
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