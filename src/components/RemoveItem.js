import {Button} from 'react-bootstrap';
import {useState} from 'react';
import Swal from 'sweetalert2';

export default function RemoveItem({productId, fetchCartData}){
	
	const removeItem = (productId) => { 
		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            if(data.message === "Product removed from cart") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: data.message
                })
                fetchCartData();

            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: data.message
                })
            }

        })
	}

	return(
		<Button variant="danger" size="sm" onClick={() => removeItem(productId)}>Remove</Button>
	)
}