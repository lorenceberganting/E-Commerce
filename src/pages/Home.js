import {Container, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import {useContext} from 'react';
import UserContext from '../UserContext';
import ItemCard from '../components/ItemCard';

export default function Home(){
	const {mode} = useContext(UserContext);
	const [products, setProducts] = useState([]);

	const fetchGuess = () => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data.products && Array.isArray(data.products)) {
	          setProducts(getRandomProducts(data.products, 4));
	        } else {
	          setProducts([]);
	        }

		}).catch(err => {
	        console.log(err);
	        setProducts([]);
	    });
	}

	useEffect(() => {
		fetchGuess();
	},[])

	const getRandomProducts = (data, num) => {
	    const products = [];
	    const randomIndices = [];

	    while (randomIndices.length < num) {
	      const randomIndex = Math.floor(Math.random() * data.length);
	      if (!randomIndices.includes(randomIndex)) {
	        randomIndices.push(randomIndex);
	      }
	    }
	    
	    randomIndices.forEach(index => {
	      products.push(data[index]);
	    });

	    return products;
	};

	return (
		<section className={`container-fluid p-5 bg-${mode.bg} text-${mode.color} `}>
			<div className={`px-5 mt-5`}>
			    <div className={`p-5 mb-3 text-center border border-${mode.color} rounded`}>
					<h1 className="my-3">E-Commerce</h1>
					<h4 className="my-3">Computer Parts and Accessories</h4>
				</div>
				<div className="container--overflow p-1">
					<span className="me-3">Computer:</span>
					<span className={`me-3 px-3 py-1 border border-${mode.color} rounded-pill`}>
						Mouse
					</span>
					<span className={`me-3 px-3 py-1 border border-${mode.color} rounded-pill`}>
						Keyboard
					</span>
					<span className={`me-3 px-3 py-1 border border-${mode.color} rounded-pill`}>
						Monitor
					</span>
					<span className={`me-3 px-3 py-1 border border-${mode.color} rounded-pill`}>
						USB
					</span>
					<span className={`me-3 px-3 py-1 border border-${mode.color} rounded-pill`}>
						Head Phones
					</span>
				</div>
			</div>

			<div className={`row my-5 p-5 justify-content-center gap-3`}>
				{products.map((product) => (
		          <div key={product._id} className="col-md-auto">
		            <ItemCard product={product} />
		          </div>
		        ))}
			</div>
			
		</section>
	)
}