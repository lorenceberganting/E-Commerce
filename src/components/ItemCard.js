import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../UserContext';

export default function ItemCard({product}) {
  const {user, mode} = useContext(UserContext);

  return (
    <Card className="card--container col" bg={mode.bg} data-bs-theme={mode.bg}>
      <Card.Body>
        <div className="img--container">
          <Card.Img variant="top" src={product.image}/>
        </div>
        <div className="d-flex"> 
          <Card.Title className="me-auto">{product.name}</Card.Title> 
          <Card.Title className="ms-auto">&#8369;{product.price}.00</Card.Title> 
        </div>
        <Link className="btn btn-primary" to={`/products/${product._id}`}>View Details</Link>
      </Card.Body>
    </Card>
  );
}
