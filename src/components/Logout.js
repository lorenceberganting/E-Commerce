import {Navigate} from 'react-router-dom'
import {useContext, useEffect} from 'react';
import UserContext from '../UserContext';

export default function Logout(){
	const {setUser,unsetUser} = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		// set the user back to it's original value
		setUser({
			id:null,
			isAdmin: null
		})
	}, [])

	return(
		<Navigate to="/"/>
	)
}