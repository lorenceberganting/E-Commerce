import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {UserProvider} from './UserContext';
import {Container} from 'react-bootstrap';
import AppNavBar from './components/AppNavBar'
import Home from './pages/Home';
import Logout from './components/Logout'
import Store from './pages/Store';
import ProductView from './pages/ProductView';
import Register from './pages/Register'
import AddProduct from './pages/AddProduct';
import ViewCart from './pages/ViewCart';
import Orders from './pages/Orders';
import ErrorPage from './pages/ErrorPage';



function App() {

  // store user info
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  // clear localStorage token
    const unsetUser = () => {
    localStorage.clear()
  }

  // store color theme
  const [mode, setMode] = useState({
    bg: "light",
    color: "dark"
  });

  // get user details to store in the user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    const modeTheme = JSON.parse(localStorage.getItem('modeTheme'));
    if(modeTheme){
      setMode({
        bg: modeTheme.bg,
        color: modeTheme.color
      })
    }
   

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data._id)
      if(typeof data._id !== "undefined"){
        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        })
      } else {
        setUser({
            id:null,
            isAdmin: null
        })
      }     
    })
    
  },[user])

  return (
    <UserProvider value={{user, setUser, unsetUser, mode, setMode}}>
      <Router>
        <Container className="p-0" fluid>
        <AppNavBar />
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/products" element={<Store />}/>
              <Route path="/register" element={<Register />}/>
              <Route exact="true" path="/products/:productId" element={<ProductView />}/>
              <Route path="/products/add-product" element={<AddProduct />}/>ViewCart
              <Route path="/cart" element={<ViewCart />}/>
              <Route path="/orders" element={<Orders />}/>ErrorPage
              <Route path="*" element={<ErrorPage />}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
