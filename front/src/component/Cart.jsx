import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common';
function Cart() {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [usecartdata, setUsecartdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    {
      axios.get(SummaryApi.getAllCart.url, {
        headers: {
          'Authorization': `Bearer ${token?.token}`
        }
      }).then((res) => {
        setUsecartdata(res.data.body || []);
        setLoading(false);
      });
    }
  }, [token?.token]);

  const handleIncrement = async (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    try {
      const response = await axios.put(`${SummaryApi.updateCart.url}${id}`, {
        quantity: newQuantity,
      }, {
        headers: {
          'Authorization': `Bearer ${token?.token}`
        }
      });

      if (response.status === 200) {
        const updatedCart = usecartdata.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setUsecartdata(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleDecrement = async (id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;
    try {
      const response = await axios.put(`${SummaryApi.updateCart.url}${id}`, {
        quantity: newQuantity,
      }, {
        headers: {
          'Authorization': `Bearer ${token?.token}`
        }
      });
      if (response.status === 200) {
        const updatedCart = usecartdata.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setUsecartdata(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${SummaryApi.deleteSingleCartItem.url}${id}`, {
        headers: {
          'Authorization': `Bearer ${token?.token}`
        }
      });

      if (response.status === 200) {
        const updatedCart = usecartdata.filter((item) => item._id !== id);
        window.location.reload();
        setUsecartdata(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const subTotal = usecartdata?.reduce((total, item) => {
    return total + (item?.quantity * item?.productId?.sellingPrice);
  }, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      {usecartdata.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price per Item ($)</th>
                  <th>Total ($)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usecartdata.map(item => (
                  <tr key={item.id}>
                    <td>{item.productId.name}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleDecrement(item._id, item.quantity)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleIncrement(item._id, item.quantity)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    {console.log(item)}
                    <td>{item.productId.sellingPrice}</td>
                    <td>{item.quantity * item.productId.sellingPrice}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
          <div className="text-end mt-3">
            <h4>Grand Total: ${subTotal}</h4>
            <Link to={"/Checkout"}>
            <button className="btn btn-primary rounded-pill mt-3 px-4 py-2">Proceed to Checkout</button>
            </Link>
           
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>Your cart is empty!</p>
          <a href="/" className="btn btn-outline-primary rounded-pill">Browse Menu</a>
        </div>
      )}
    </div>
  );
}

export default Cart;
