import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import axios from "axios"
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { useCart } from './CartProvider'
function Menu() {

  const [data, setData] = useState([])
  const { setCartCount } = useCart();

  const getToken = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(getToken);
  console.log(userInfo, "userInfo")


  const dataGet = async () => {
    try {
      const result = await axios.get(SummaryApi.productGet.url)
      console.log(result, "result")
      setData(result.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dataGet()
  }, [])


  const handleAddToCart = async (productId) => {
    console.log(productId, "jkjk")
    try {
      if (!userInfo) {
        toast.error('Please login first');
        return;
      }

      const cartResponse = await axios.get(SummaryApi.getAllCart.url, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      console.log(cartResponse, "cartResponse")

      let cartItems = cartResponse.data.body;
      const existingProduct = cartItems.find(
        (item) => item?.productId?._id === productId
      );
      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + 1;

        await axios.put(
          `${SummaryApi.updateCart.url}${existingProduct._id}`,
          {
            quantity: updatedQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        toast.success('Quantity updated in your cart');
      } else {
        await axios.post(
          SummaryApi.addToCart.url,
          {
            productId,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        toast.success('Successfully added to your cart');
      }

      const updatedCartResponse = await axios.get(SummaryApi.getAllCart.url, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      if (updatedCartResponse.data.status === 200) {
        console.log(updatedCartResponse, "updatedCartResponse")
        setCartCount(updatedCartResponse.data.body.length);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  return (

    <>
      {/* Menu Start */}
      <div className="container-fluid menu bg-light py-6 my-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Menu
            </small>
            <h1 className="display-5 mb-5">Most Popular Food in the World</h1>
          </div>
          <div className="tab-class text-center">
            {/* <ul
              className="nav nav-pills d-inline-flex justify-content-center mb-5 wow bounceInUp"
              data-wow-delay="0.1s"
            >
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-6"
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Starter
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-7"
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Main Course
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-8"
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Drinks
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-9"
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Offers
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-10"
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Our Spesial
                  </span>
                </a>
              </li>
            </ul> */}
            <div className="tab-content">
              <div id="tab-6" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {data?.map((e) => (
                    <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.1s">
                      <div className="menu-item d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid rounded-circle"
                          src={e?.image}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                        <div className="w-100 d-flex flex-column text-start ps-4">
                          <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                            <h4>{e?.name}</h4>
                            <h4 className="text-primary">${e?.sellingPrice}</h4>
                          </div>
                          <p className="mb-0">
                            {e?.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(e?._id)}
                          className="btn btn-success"
                        >
                          Add to Cart <i className="fa fa-cart-plus ms-2"></i>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.2s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-02.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet Potato</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.3s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sabudana Tikki</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.4s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-04.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Pizza</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.5s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-05.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Bacon</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.6s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-06.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Chicken</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.7s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Blooming</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.8s">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-08.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div id="tab-7" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-01.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Argentinian</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Crispy</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-05.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sabudana Tikki</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Blooming</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-08.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Argentinian</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Lemon</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-02.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Water Drink</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-01.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Salty lemon</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-8" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-01.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Crispy water</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-02.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Juice</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Orange</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-04.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Apple Juice</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-05.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Banana</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-06.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet Water</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Hot Coffee</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-08.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet Potato</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-9" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-06.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sabudana Tikki</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Crispy</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-09.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Pizza</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-02.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Bacon</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Chicken</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-05.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Blooming</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-09.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Argentinian</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-10" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-06.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sabudana Tikki</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Crispy</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-09.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Pizza</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-02.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Bacon</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-03.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Chicken</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-05.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Blooming</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-07.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Sweet</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="menu-item d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded-circle"
                        src="assets/img/menu-09.jpg"
                        alt=""
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                          <h4>Argentinian</h4>
                          <h4 className="text-primary">$90</h4>
                        </div>
                        <p className="mb-0">
                          Consectetur adipiscing elit sed dwso eiusmod tempor
                          incididunt ut labore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* Menu End */}
    </>


  )
}

export default Menu
