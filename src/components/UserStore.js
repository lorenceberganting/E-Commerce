import {useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';
import {Form, Button} from 'react-bootstrap';

import ItemCard from './ItemCard';


export default function UserStore({productsData}){
	const {user, mode} = useContext(UserContext);

	const [productName, setProductName] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const handleSearch = async() => {
		console.log(productName);
		try {
			const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search-by-name`, {
		        method: 'POST',
		        headers: {
		          'Content-Type': 'application/json'
		        },
		        body: JSON.stringify({ name: productName })
		    });
	      	const data = await response.json();
	      	if(data.message === "Product Not Found"){
	      		setSearchResults([]);
	      	} else {
	      		setSearchResults(data);
	      	}
		} catch(error) {
			console.error('Error searching for courses:', error);
			setSearchResults([]);
		}
	}

	useEffect(() => {
		handleSearch()
	}, [handleSearch, productName])

	console.log(searchResults.length);
	// console.log(productsData);
	return (
		<section className={`container-fluid p-5 bg-${mode.bg} text-${mode.color}`}> 
			<div className="mt-5 d-flex flex-column align-items-center">
				<h2 className="text-center">Store</h2>
				<div id="search--bar" className="my-5">
					<Form.Control aria-label="Text input with checkbox" 
						placeholder="Search product..."
						value={productName}
						onChange={e => setProductName(e.target.value)}
					/>
				</div>
				{ (searchResults.length !== 0) ?
					<div className="row gap-3">
						{searchResults.map((product) => (
				          <div key={product._id} className="col-md-auto">
				            <ItemCard product={product} />
				          </div>
				        ))}	
					</div>
					:
					<>
						<h2>Item not found T.T</h2>
						<h4>||</h4>
						<h4>Maybe it's Loading..?</h4> 
					</>				
				}
			</div>
		</section>
	)
}

