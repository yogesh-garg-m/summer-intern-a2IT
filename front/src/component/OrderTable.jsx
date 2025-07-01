import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Swal from "sweetalert2";
import axios from 'axios';

function OrderTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const dataaa = await axios.get(SummaryApi.orderGetAllForAdmin.url,);
      console.log(dataaa)
      setData(dataaa.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteHandler = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${SummaryApi.orderDelete.url}${id}`);
          getAllUsers();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
    <div className="container">
      <div className="bg-light p-4 rounded shadow-sm">
        <h3 className="text-center mb-4">All Orders</h3>
        <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Order ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Address</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Sub Total</th>
                <th scope="col">Shipping Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e,index) => (
                <tr key={e._id}>
                  <td>{index + 1}</td>
                  <td>{e.orderId}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.address}</td>
                  <td>{new Date(e.createdAt).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                  <td>{new Date(e.createdAt).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}</td>
                  <td>
                    {e.products?.map((product) => {
                      const productName = product?.productId?.name;
                      return Array.isArray(productName)
                        ? productName.join(", ")
                        : productName || "Unknown";
                    }).join(", ")}
                  </td>
                  <td>{e?.quantity}</td>
                  <td>
                    {e.products?.map((product) => {
                      const priceDetail = product?.productId?.sellingPrice;
                      return Array.isArray(priceDetail)
                        ? priceDetail.map((price) => `₹ ${price}`).join(", ")
                        : `₹ ${priceDetail || "Unknown"}`;
                    }).join(", ")}
                  </td>
                  <td>₹ {e.totalAmount}</td>
                  <td>₹ 20</td>
                  <td>₹ {e.totalAmount + 20}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.length === 0 && (
            <p className="text-center mt-3 text-muted">No users found.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default OrderTable;
