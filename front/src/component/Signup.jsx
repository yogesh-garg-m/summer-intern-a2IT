import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SummaryApi from '../common';

function Signup() {
 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""

})
const navigate = useNavigate()

const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
}


const handleSubmit = async (e) => {
    e.preventDefault()

   

        const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        console.log(dataApi);
        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate("/login")
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    

}
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit} onChange={handleOnChange}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
             
              required
            />
            <label>Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Username"
             
              required
            />
            <label>Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              
              required
            />
            <label>Password</label>
          </div>

          

          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
