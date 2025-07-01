import React, {
  useContext, useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom';


import SummaryApi from '../common';

import { toast } from 'react-toastify';

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  // const { fetchUserDetails } = useContext(Context)


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

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()
    console.log(dataApi, "dataApi")

    if (dataApi.success) {
      toast.success(dataApi.message)
      localStorage.setItem("userInfo", JSON.stringify(dataApi.data))
      navigate('/')
      window.location.reload()
      // fetchUserDetails()

    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }

  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login to CaterServ</h3>
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

          <div className="form-floating mb-4">
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
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account? <a href="/Signup">Register Here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
