import {useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';

import UserStore from '../components/UserStore';
import AdminStore from '../components/AdminStore';

export default function Store() {
	const {user, mode} = useContext(UserContext);

	const [products, setProducts] = useState([]);

	const fetchData = () => {

		if (user.id !== null) {
			fetchAuthUser();
		} else {
			fetchGuess();
		}
		
	}

	useEffect(() => {
		fetchData();
	}, []);


	// fetch product data without authentication
	const fetchGuess = () => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data.products && Array.isArray(data.products)) {
	          setProducts(data.products);
	        } else {
	          setProducts([]);
	        }

		}).catch(err => {
	        console.log(err);
	        setProducts([]);
	    });
	}

	// fetch product data with authentication
	const fetchAuthUser = () => {
		let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active` 

		fetch(fetchUrl, {
			headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data.products && Array.isArray(data.products)) {
	          setProducts(data.products);
	        } else {
	          setProducts([]);
	        }

		}).catch(err => {
	        console.log(err);
	        setProducts([]);
	    });
	}

	console.log(products);
	return(
		<>
			{ (user.id !== null) ?
				(user.isAdmin) ?
					<AdminStore productsData={products} fetchData={fetchData}/>
					:
					<UserStore productsData={products} />
				:
				<UserStore productsData={products} />
			}
		</>
	)

}