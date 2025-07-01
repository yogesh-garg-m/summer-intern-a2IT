import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
function MyOrder() {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const getOrders = async () => {
    try {
      const dataaa = await axios.get(SummaryApi.orderGetAll.url, {
        headers:
        {
          "Authorization": `Bearer ${token?.token}`

        }
      })
      console.log(dataaa.data.body, "dataaa.data.body")
      setData(dataaa.data.body)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Orders</h2>
      {data.length > 0 ? (
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
        </div>
      ) : (
        <div className="text-center">
          <p>You haven't placed any orders yet.</p>
          <a href="/menu" className="btn btn-outline-primary rounded-pill">Browse Menu</a>
        </div>
      )}
    </div>
  );
}

export default MyOrder;
