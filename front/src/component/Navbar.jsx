import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import SummaryApi from '../common';
import { useCart } from './CartProvider';

function Navbar() {
    const navigate=useNavigate()
    const { cartCount, setCartCount } = useCart();
    const getCookieUser = localStorage.getItem("userInfo");
    const userInfo = getCookieUser ? JSON.parse(getCookieUser) : null;
    const fetchCartData = async () => {
        try {
            const res = await axios.get(SummaryApi.getAllCart.url, {
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`
                }
            });
            if (res.data.status === 200) {
                setCartCount(res.data.body.length);
            }
        } catch (error) {
            console.error("Error fetching cart data", error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchCartData();
        }
    }, [userInfo]);

    const handleLogout = () => {
        localStorage.clear("userInfo");
        window.location.reload()
        setCartCount(0); // Reset cart count on logout
        navigate("/Login")
    };
    return (
        <>
            <div className="container-fluid nav-bar">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand-lg py-4">
                        <Link to="/" className="navbar-brand">
                            <h1 className="text-primary fw-bold mb-0">
                                Cater<span className="text-dark">Serv</span>
                            </h1>
                        </Link>
                        <button
                            className="navbar-toggler py-2 px-3"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="fa fa-bars text-primary" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="/About" className="nav-item nav-link">About</Link>
                                <Link to="/Services" className="nav-item nav-link">Services</Link>
                                <Link to="/Events" className="nav-item nav-link">Events</Link>
                                {userInfo?.role===1?<Link to="/AdminDashboard" className="nav-item nav-link">Admin Dashboard</Link>:""}
                                
                                {userInfo?.role===0 ?
                                    <Link to="/Menu" className="nav-item nav-link">Menu</Link> : ""}

                                <div className="nav-item dropdown">
                                    <Link
                                        to="#"
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Pages
                                    </Link>
                                    <div className="dropdown-menu bg-light">
                                        <Link to="/Book" className="dropdown-item">Booking</Link>
                                        <Link to="/Blog" className="dropdown-item">Blog</Link>
                                        <Link to="/Team" className="dropdown-item">Our Team</Link>
                                        <Link to="/Testimonial" className="dropdown-item">Testimonial</Link>
                                        <Link to="/Error" className="dropdown-item">404 Page</Link>
                                    </div>
                                </div>

                               {userInfo?.role===0? <Link to="/Contact" className="nav-item nav-link">Contact</Link>:""}
                            </div>

                            <div className="d-flex align-items-center">
                                {/* Search Button */}
                                <button
                                    className="btn-search btn btn-primary btn-md-square me-3 rounded-circle d-none d-lg-inline-flex"
                                    data-bs-toggle="modal"
                                    data-bs-target="#searchModal"
                                >
                                    <i className="fas fa-search" />
                                </button>

                                {/* Cart Icon */}
                                {userInfo?.role===0 ?
                                    <div className="position-relative me-2">
                                        <Link to="/Cart" className="btn btn-outline-primary rounded-circle">
                                            <i className="fas fa-shopping-cart"></i>
                                        </Link>
                                        {cartCount > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cartCount ? cartCount : 0}

                                            </span>
                                        )}
                                    </div> : ""}

                                {userInfo?.role===0 ? <Link to="/Myorder" className="btn btn-outline-secondary rounded-pill me-2 px-3">
                                    My Orders
                                </Link> : ""}

                                {/* My Orders Button */}


                                {/* Checkout Button */}
                                {/* <Link to="/Checkout" className="btn btn-success rounded-pill me-2 px-3">
                                    Checkout
                                </Link> */}

                                {/* Login Icon */}
                                { }

                                {/* Signup Icon */}

                                {userInfo ? <button className="btn btn-outline-dark "  onClick={handleLogout}>Logout</button>
                                    : <Link to="/Login" className="btn btn-outline-dark rounded-circle">
                                        <i className="fas fa-user-plus"></i>
                                    </Link>}
                                {/* <Link to="/Signup" className="btn btn-outline-dark rounded-circle">
                                    <i className="fas fa-user-plus"></i>
                                </Link> */}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Modal Search Start */}
            <div
                className="modal fade"
                id="searchModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input
                                    type="search"
                                    className="form-control bg-transparent p-3"
                                    placeholder="keywords"
                                    aria-describedby="search-icon-1"
                                />
                                <span id="search-icon-1" className="input-group-text p-3">
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
        </>
    );
}

export default Navbar;
