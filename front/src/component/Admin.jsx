import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row">
        {/* Manage Users Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="assets/img/users-icon.png"
              className="card-img-top"
              alt="Manage Users"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">
                View, edit, and manage all the registered users on the platform.
              </p>
              <Link to="/usertable" className="btn btn-primary">Go to Users</Link>
            </div>
          </div>
        </div>

        {/* Manage Orders Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="assets/img/orders-icon.png"
              className="card-img-top"
              alt="Manage Orders"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Manage Orders</h5>
              <p className="card-text">
                View, update, and manage all customer orders and requests.
              </p>
              <Link to="/orders" className="btn btn-primary">Go to Orders</Link>
            </div>
          </div>
        </div>

        {/* Manage Menu Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="assets/img/menu-icon.png"
              className="card-img-top"
              alt="Manage Menu"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Manage Menu</h5>
              <p className="card-text">
                Add, remove, or update menu items for the catering services.
              </p>
              <Link to="/menu" className="btn btn-primary">Go to Menu</Link>
            </div>
          </div>
        </div>

        {/* Site Settings Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="assets/img/settings-icon.png"
              className="card-img-top"
              alt="Site Settings"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Site Settings</h5>
              <p className="card-text">
                Update site preferences, such as contact info, logo, etc.
              </p>
              <Link to="/settings" className="btn btn-primary">Go to Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
