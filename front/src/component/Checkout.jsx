import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

function Checkout() {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  
  const [orderCreate, setOrderCreate] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      products: []
  });
  const navigate = useNavigate();

  // Updated handleChangeOfOrder function
  const handleChangeOfOrder = (e) => {
      setOrderCreate({ ...orderCreate, [e.target.name]: e.target.value });
  };

  // Function to calculate subtotal
  const calculateSubtotal = (cartItems) => {
      return cartItems.reduce((total, item) => total + (item.quantity * item.productId.sellingPrice), 0);
  };

  const handleSubmitOfOrder = async (e) => {
      e.preventDefault();
      try {
          const dataOfProductIds = cart?.map((items) => items?.productId?._id);
          console.log(dataOfProductIds,"dataOfProductIds")
          const dataOfProductIdsFromProduct = product?.map((items) => items?._id);
          console.log(dataOfProductIdsFromProduct,"dataOfProductIdsFromProduct")
          const commonProductIds = dataOfProductIdsFromProduct.filter(productId => dataOfProductIds.includes(productId));
          console.log(commonProductIds,"commonProductIds")
          const totalQuantity = cart?.reduce((acc, item) => acc + item?.quantity, 0);

          const updateProducts = {
              ...orderCreate,
              products: commonProductIds,
              quantity: totalQuantity,
              totalAmount: subTotal // Ensure subTotal is calculated before this point
          };

          const res = await axios.post(SummaryApi.orderCreate.url, updateProducts, {
              headers: {
                  "Authorization": `Bearer ${token?.token}`
              }
          });

          setOrderCreate(res.data.body);
          await axios.delete(SummaryApi.deleteCart.url, {
              headers: {
                  "Authorization": `Bearer ${token?.token}`
              }
          });
          toast.success("Order is placed successfully");
          navigate("/");
          window.location.reload();
      } catch (error) {
          console.log(error);
      }
  };

  const getCartData = async () => {
      try {
          const data = await axios.get(SummaryApi.getAllCart.url, {
              headers: {
                  "Authorization": `Bearer ${token?.token}`
              }
          });
          setCart(data?.data?.body);
          const subtotal = calculateSubtotal(data?.data?.body);
          if (subtotal > 0) {
              setLoading(false); // Stop loading if subtotal is valid
          }
      } catch (error) {
          console.log(error);
      }
  };

  const getProductData = async () => {
      try {
          const data = await axios.get(SummaryApi.productGet.url, {
              headers: {
                  "Authorization": `Bearer ${token?.token}`
              }
          });
          setProduct(data?.data?.body);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      getCartData();
      getProductData();
  }, []);

  const subTotal = calculateSubtotal(cart); // Calculate subtotal
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Checkout</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <h4 className="mb-3">Your Order</h4>
          <ul className="list-group mb-4">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {console.log(item,"item")}
                {item.productId.name} (x{item.quantity})
                <span>${item.productId.sellingPrice * item.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
              Total
              <span>${subTotal}</span>
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h4 className="mb-3">Billing Details</h4>
          <form onSubmit={handleSubmitOfOrder} onChange={handleChangeOfOrder}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Full Name"
                
                required
              />
              <label>Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                
                required
              />
              <label>Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Email Phone number"
               
                required
              />
              <label>Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                name="address"
                className="form-control"
                placeholder="Delivery Address"
               
                style={{ height: '100px' }}
                required
              ></textarea>
              <label>Delivery Address</label>
            </div>

            {/* <div className="form-floating mb-4">
              <select
                className="form-select"
                name="paymentMethod"
              
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
              </select>
              <label>Payment Method</label>
            </div> */}

            <button type="submit" className="btn btn-primary w-100 py-3">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
