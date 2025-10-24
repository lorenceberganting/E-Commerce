/*import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Accordion } from 'react-bootstrap';
import EditQuantity from '../components/EditQuantity';
import RemoveItem from '../components/RemoveItem';
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';

export default function UserOrder(){
	const { user, mode } = useContext(UserContext);
  	const [orderItems, setOrderItems] = useState([]);
  	const [orders, setOrders] = useState([]);
  	const [productDetails, setProductDetails] = useState({});

  	const fetchOrderData = () => {
	  	fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
		      headers: {
		        Authorization: `Bearer ${localStorage.getItem('token')}`
		      }
		    })
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data.order.productsOrdered)) {
					console.log(data.order.productsOrdered);
					setOrders(data.order);
				  	setOrderItems(data.order.productsOrdered);
				  
				  	fetchAllProductDetails(data.order.productsOrdered);
				} else {
				  	setOrders([]);
				}
			})
			.catch(err => {
				console.log(err);
				setOrders([]);
			});
	};


	const fetchAllProductDetails = (productsOrdered) => {
  	
	    const productIds = productsOrdered.map(item => item.productId);
	    Promise.all(productIds.map(productId => 
	      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
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
	console.log(orderItems)
	console.log(productDetails)
  	return (
  			(user.id === null) ?
  			<Navigate to="/" />
  			:
	  			
  			<section className={`container-fluid container--full p-5 bg-${mode.bg} text-${mode.color} text-center`}>
  				<h1 className="my-5">Your Orders</h1>
  						<Accordion className="my-5">
					      <Accordion.Item eventKey="0">
					        <Accordion.Header></Accordion.Header>
					        <Accordion.Body>
					          {/*{put the data here}*/}
					        </Accordion.Body>
					      </Accordion.Item>
					    </Accordion> 					
  			</section>
	  		
  	)
}*/