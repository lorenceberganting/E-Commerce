import {useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';
import {useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Login from '../components/Login';
import Swal from 'sweetalert2';

export default function ProductView(){
	const {productId} = useParams();

	const {user, mode} = useContext(UserContext);

	const [count, setCount] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);

	const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

	function addQuantity(){
		setCount(count + 1);
	}

	function subQuantity(){
		if(count > 1){
			setCount(count - 1);
		}
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setImage(data.image);
        })
	})

	function addToCart(){
		let subTotal = count * price;
		const cartData = {
			cartItems: [
				{
					productId: productId,
					quantity: count,
					subtotal: subTotal
				}
			],
			totalPrice: subTotal
		}
		console.log(cartData);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
			method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(cartData)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.message === "Item Added Cart Successfully"){
				Swal.fire({
                    title: data.message,
                    icon: "success",
                    text: "View you cart"
                });

			} else {
				Swal.fire({
                    title: "Cart Error",
                    icon: "error",
                    text: data.message
                });
			}

		})

	}

	return (
		<section className={`container-fluid container--full p-5 bg-${mode.bg} text-${mode.color} d-flex flex-column align-items-center`}> 
			<div className="row p-5 mt-5" id="view-product">
				<div className={`col-md-6 border border-${mode.color}`}>
					<img className="img-fluid" src={image}/>
				</div>
				<div className={`col-md-6 p-0`}>
					<div className={`row-md-3 border border-${mode.color} p-3`}>
						<h4>Name: {name}</h4>
					</div>
					<div className={`row-md-3 border border-${mode.color} p-3`}>
						<h4>Description:</h4>
						<p>
							{description}
						</p>
					</div>
					<div className={`row-md-3 border border-${mode.color} p-3`}>
						<h4>Price: &#8369;{price}.00</h4>
					</div>
					<div className={`row-md-3 border border-${mode.color} p-3 d-flex gap-5`}>
						<h4>Quantity:</h4>
						<div className="d-flex">
							<Button variant={mode.color} onClick={subQuantity}>-</Button>
								<h4 className="px-5">{count}</h4>
							<Button variant={mode.color} onClick={addQuantity}>+</Button>
						</div>
					</div>
					<div className={`row-md-3 p-1`}>
						{(user.id) ?
							<Button variant="primary" onClick={addToCart}>Add To Cart</Button>
							:
							<button type="button" class="btn btn-outline-info">
								<Login />
							</button>
						}
					</div>
				</div>
			</div>
		</section>
	)
}