import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from '../services/apiService';
import './home.css';
import Footer from '../components/general/footer';
import { logout } from "../components/general/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const userData = localStorage.getItem(TOKEN_KEY);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
    setIsNavCollapsed(true);
  };

  return (
    <>
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
                      <Link
                        className="nav-link"
                        to="/user-company"
                        onClick={() => setIsNavCollapsed(true)}
                      >
                        Companies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/devices"
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
                      Hello Guest
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
      <div className="home-background"></div>
     <Footer/>
    </>
  );
}
