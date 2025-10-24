import {useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';
import { Table } from 'react-bootstrap';
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminStore({productsData, fetchData}){
	const {user, mode} = useContext(UserContext);
	
	 const [products, setProducts] = useState([])


    //Getting the coursesData from the courses page
    useEffect(() => {
        const productArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>&#8369;{product.price}.00</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><EditProduct product={product._id} fetchData={fetchData}/></td> 
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>    
                </tr>
                )
        })

        setProducts(productArr)

    }, [productsData])

	return (
		<section className={`container-fluid p-5 bg-${mode.bg} text-${mode.color}`}> 
			<h1 className="text-center my-4"> Admin Dashboard</h1>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
		</section>
	)
}

