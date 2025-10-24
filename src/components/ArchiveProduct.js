import {Button} from 'react-bootstrap';
import {useState} from 'react';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}){

	const archiveToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            if(data.message === "Product Archived Successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: data.message
                })
                fetchData();

            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: data.message
                })
            }


        })
    }

    const activateToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)

            // data.message can also be used as condition
            if(data.message === "Product Activated Successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: data.message
                })
                fetchData();
            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: data.message
                })
                fetchData();
            }
            fetchData();
        })
    }

	return(
		<>
            {isActive ?

                <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

            }
        </>
	)
}