import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Accordion, Table } from 'react-bootstrap';
import EditQuantity from '../components/EditQuantity';
import RemoveItem from '../components/RemoveItem';
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';

export default function Orders(){
	const { user, mode } = useContext(UserContext);
  	const [orderItems, setOrderItems] = useState([]);
  	const [orders, setOrders] = useState([]);
  	const [productDetails, setProductDetails] = useState({});

  	const fetchOrderData = () => {
  		let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders` 

  		
	  	fetch(fetchUrl, {
		      headers: {
		        Authorization: `Bearer ${localStorage.getItem('token')}`
		      }
		    })
			.then(res => res.json())
			.then(data => {
				console.log(data.order.length);
				if (data.order.length > 0) {
					console.log("orders")
					setOrders(data.order);
				  
				  	const productIds = data.order.flatMap(order => order.productsOrdered.map(item => item.productId));
				  	fetchAllProductDetails(productIds);
				} else {
				  	setOrders([]);
				}
			})
			.catch(err => {
				console.log(err);
				setOrders([]);
			});
	};


	const fetchAllProductDetails = (productIds) => {
	    Promise.all(productIds.map(productId =>
	      fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
	        .then(res => res.json())
	    ))
	    .then(products => {
	      const productMap = {};
	      products.forEach(product => {
	        productMap[product._id] = product;
	      });
	      setProductDetails(productMap);
	    })
	    .catch(err => {
	      console.log(err);
	    });
	};

	useEffect(() => {
	    fetchOrderData();
	}, []);


	
	console.log(orders)
	// console.log(orderItems)
	// console.log(productDetails)
  	return (
  			(user.id === null) ?
  			<Navigate to="/" />
  			:
	  			
  			<section className={`container-fluid container--full p-5 bg-${mode.bg} text-${mode.color} text-center`}>
  				{ (user.isAdmin) ?
	  				<h1 className="my-5">User Order's History</h1>	
	  				:
	  				<h1 className="my-5">Your Orders</h1>
  				}	
  						{ 
  							orders.map(order => (
  								<Accordion className="my-2">
							      <Accordion.Item eventKey="0">
							        <Accordion.Header>
							        	<div className="me-3">Order On: {order.ordereddOn}</div>
							        	<div className="me-3 text-success">Total Price: &#8369;{order.totalPrice}.00</div>
							        	<div className="text-danger">Status: {order.status}</div>
							        </Accordion.Header>
							        <Accordion.Body>
							         	<Table striped bordered hover responsive>
							                <thead>
							                    <tr className="text-center">
							                    	{ (user.isAdmin) ?
							                    		<th>User Id</th>
							                    		:
							                    		<></>
							                    	}
							                        <th>Name</th>
							                        <th>Price</th>
							                        <th>Quantity</th>
							                        <th>Subtotal</th>
							                    </tr>
							                </thead>

							                <tbody>
							                    {order.productsOrdered.map(item => {
								                    const product = productDetails[item.productId];
								                    return (
								                      <tr key={item.productId}>
								                      	{ (user.isAdmin) ?
								                    		<td>{order.userId}</td>
								                    		:
								                    		<></>
								                    	}
								                        <td>{product ? product.name : 'Loading...'}</td>
								                        <td>{product ? `₱${product.price}.00` : 'Loading...'}</td>
								                        <td>{item.quantity}</td>
								                        <td>₱{item.subtotal}.00</td>
								                      </tr>
								                    );
								                })}
							                </tbody>
							            </Table> 
							        </Accordion.Body>
							      </Accordion.Item>
							    </Accordion> 
  							))	
					    }
										
  			</section>
	  		
  	)
}