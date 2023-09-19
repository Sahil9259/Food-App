import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    const loadCart = () => {
        setCartView(true)
    }
    const items = useCart();
    return (
        <div style={{ backgroundColor: "darkblue" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 ">Foodie App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active " aria-current="page" to="/home">Home</Link>
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="navbar-nav d-flex">
                                <Link className="nav-link fs-5 mx-3 active " to="/login">Login</Link>
                                <Link className="nav-link fs-5 mx-3 active " to="/signup">Signup</Link>
                            </form> 
                            // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            //     <li className="nav-item">
                            //         <Link className="nav-link fs-5 mx-3 active " aria-current="page" to="/login">Login</Link>
                            //     </li>
                            //     <li className="nav-item">
                            //         <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/signup" >Signup</Link>
                            //     </li>
                            // </ul>
                            :
                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <div className="nav-link fs-5 mx-3 active " onClick={loadCart}>
                                            <Badge color="secondary" badgeContent={items.length} >
                                                <ShoppingCartIcon />
                                            </Badge>
                                            Cart
                                        </div>

                                        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={handleLogout} className="nav-link fs-5 mx-3 active" >Logout</Link>

                                    </li>
                                </ul>


                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
