import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homeAdmin.css";
import { logout } from "../../components/general/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HomeAdmin() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
    setIsNavCollapsed(true);
  };

  return (
    <div className="container-fluid p-2 shadow">
      <header className="home-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/user-info">
              {userInfo?.name || "Home"}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {userInfo ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/users/usersList">
                        Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/admin-companies"
                        onClick={() => setIsNavCollapsed(true)}
                      >
                        Companies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/admin-devices"
                        onClick={() => setIsNavCollapsed(true)}
                      >
                        Devices
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Home Page
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav ms-auto">
                {!userInfo ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/Login"
                        onClick={() => setIsNavCollapsed(true)}
                      >
                        Log in
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/Signup"
                        onClick={() => setIsNavCollapsed(true)}
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
