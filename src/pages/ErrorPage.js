import {useContext} from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    const {mode} = useContext(UserContext);
    
    return (
        <section className={`container-fluid container--full p-5 bg-${mode.bg} text-${mode.color}`}>
            
            <div className="text-center m-5 p-5">
                <div className="my-5">
                    <img
                      src="./404-img.png"
                      width="400"
                      height="400"
                      className="img-fluid"
                      alt="React Bootstrap logo"
                    />
                </div>
                <h4>The page you are looking for cannot be found</h4>
                <Link className="btn btn-primary" to="/">Go To Home</Link>
                
            </div>
        </section>
    )
}