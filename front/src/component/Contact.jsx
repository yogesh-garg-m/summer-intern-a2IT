import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import SummaryApi from '../common'
import { toast } from 'react-toastify'
function Contact() {
  const [data, setData] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await axios.post(SummaryApi.createContactUs.url, data, {
        headers: {
          "content-type": "application/json"
        },
      }).then((res) => {
        if (res.data.status == 200) {
          setData(res.data.body)
          navigate("/")
          toast.success(`Message sent successfully to admin`)
        } else {
          toast.error(res.data.message)

        }

      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
  {/* Contact Start */}
  <div
    className="container-fluid contact py-6 wow bounceInUp"
    data-wow-delay="0.1s"
  >
    <div className="container">
      <div className="p-5 bg-light rounded contact-form">
        <div className="row g-4">
          <div className="col-12">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Get in touch
            </small>
            <h1 className="display-5 mb-0">Contact Us For Any Queries!</h1>
          </div>
          <div className="col-md-6 col-lg-7">
            <p className="mb-4">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax &amp; PHP in a few minutes. Just
              copy and paste the files, add a little code and you're done.{" "}
              <a href="https://htmlcodex.com/contact-form">Download Now</a>.
            </p>
            <form onChange={handleChange} onSubmit={handleSubmit}>
            <input
                type="text"
                name='name'
                className="w-100 form-control p-3 mb-4 border-primary bg-light"
                placeholder="Your Name"
              />
              <input
                type="email"
                name='email'
                className="w-100 form-control p-3 mb-4 border-primary bg-light"
                placeholder="Enter Your Email"
              />
              <input
                type="text"
                name='subject'
                className="w-100 form-control p-3 mb-4 border-primary bg-light"
                placeholder="Enter Your Subject"
              />
              <textarea
                className="w-100 form-control mb-4 p-3 border-primary bg-light"
                rows={4}
                cols={10}
                name='message'
                placeholder="Your Message"
                defaultValue={""}
              />
              <button
                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                type="submit"
              >
                Submit Now
              </button>
            </form>
          </div>
          <div className="col-md-6 col-lg-5">
            <div>
              <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                <div className="">
                  <h4>Address</h4>
                  <p>123 Street, New York, USA</p>
                </div>
              </div>
              <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                <i className="fas fa-envelope fa-2x text-primary me-4" />
                <div className="">
                  <h4>Mail Us</h4>
                  <p className="mb-2">info@example.com</p>
                  <p className="mb-0">support@example.com</p>
                </div>
              </div>
              <div className="d-inline-flex w-100 border border-primary p-4 rounded">
                <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                <div className="">
                  <h4>Telephone</h4>
                  <p className="mb-2">(+012) 3456 7890 123</p>
                  <p className="mb-0">(+704) 5555 0127 296</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
</>

  )
}

export default Contact
