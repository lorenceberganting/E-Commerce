import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Table, Button } from 'react-bootstrap';
import EditQuantity from '../components/EditQuantity';
import RemoveItem from '../components/RemoveItem';
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';

export default function ViewCart() {
  const { user, mode } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [total, setTotal] = useState();
  const [quantity, setQuantity] = useState(0)

  const fetchCartData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.cart && Array.isArray(data.cart[0].cartItems)) {
          setCart(data.cart[0].cartItems);
          // console.log(data.cart[0].totalPrice);
          setTotal(data.cart[0].totalPrice);
          fetchAllProductDetails(data.cart[0].cartItems);
        } else {
          setCart([]);
        }
      })
      .catch(err => {
        console.log(err);
        setCart([]);
      });
  };

  const fetchAllProductDetails = (cartItems) => {
  	
    const productIds = cartItems.map(item => item.productId);
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
    fetchCartData();
  }, []);

  function checkoutCart(e){
  	e.preventDefault();
  	fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
  	  method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
    	// console.log(data);
    	if(data.message === "User Ordered Successfully") {
                clearCart();
        } else {
            Swal.fire({
                title: 'Something Went Wrong',
                icon: 'Error',
                text: data.message
            })
        }
    })
  }

  const clearCart = () => {
  	fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
    	console.log(data);
    	if(data.message === "Cart cleared successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: data.message
                })
                fetchCartData()
        } else {
            Swal.fire({
                title: 'Something Went Wrong',
                icon: 'Error',
                text: data.message
            })
        }
    })
  }

  return (
    (user.id === null) ?
      <Navigate to="/" />
      :
      <>
        <section className={`container-fluid container--full p-5 bg-${mode.bg} text-${mode.color}`}>
        {
        	(cart.length < 1)?
        	  <h1 className="text-center my-5 p-5">Your Shopping Cart Is Empty</h1>
        	:
    	      <div className="p-md-5 m-5">
    	        <h1 className="text-center my-4">Your Shopping Cart</h1>
    	        <Table striped bordered hover responsive>
    	          <thead>
    	            <tr className="text-center">
    	              <th>Name</th>
    	              <th>Price</th>
    	              <th>Quantity</th>
    	              <th>Subtotal</th>
    	              <th colSpan="2"></th>
    	            </tr>
    	          </thead>
    	          <tbody>
    	            {
    	              cart.map(item => (
    	                <tr key={item.productId}>
    	                  <td>{productDetails[item.productId]?.name || 'Loading...'}</td>
    	                  <td>&#8369;{productDetails[item.productId]?.price || 'Loading...'}.00</td>
    	                  <td>{item.quantity}</td>
    	                  <td>{item.subtotal}</td>
    	                  <td>
    	                  	<EditQuantity productId={item.productId} quantity={item.quantity} fetchCartData={fetchCartData} />
    	                  </td>
    	                  <td>
    	                  	<RemoveItem productId={item.productId} fetchCartData={fetchCartData}/>
    	                  </td>
    	                </tr>
    	              ))
    	            }
    	          </tbody>
    	        </Table>
    	        <div className="d-flex align-items-center gap-5">
    	        	<Button variant="success" onClick={e => {checkoutCart(e)}}>Checkout</Button>
    	        	<h4>TOTAL: &#8369;{total}</h4>
    	        </div>
    	      </div>
        }
        </section>
      </>
    
  );
}
