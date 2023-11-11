import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './headerClient.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../general/features/auth/authSlice'; // Import the logout action creator

export default function HeaderClient() {
  const nav = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // Get userInfo from Redux state

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    nav("/login");
    setIsNavCollapsed(true); // Close the menu on logout
  };

  return (
    <>
      <header className="container-fluid bg-light p-2 shadow">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className='navbar-brand' to="/">{userInfo?.name || 'Home'}</Link>
            <button className="navbar-toggler" type="button"
             data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" 
              aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={
                () => setIsNavCollapsed(!isNavCollapsed)}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} 
            navbar-collapse`} id="navbarNavDropdown">
              <ul className="navbar-nav">
                {userInfo ? (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/user-company" onClick={
                      () => setIsNavCollapsed(true)}>Companies</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/devices" onClick={
                      () => setIsNavCollapsed(true)}>Devices</Link></li>
                  </>
                ) : (
                  <li className="nav-item"><Link className="nav-link" to="/" onClick={
                    () => setIsNavCollapsed(true)}>Home Page</Link></li>
                )}
              </ul>
              <ul className="navbar-nav ms-auto">
                {!userInfo ? (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/Login" onClick={
                      () => setIsNavCollapsed(true)}>Log in</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/Signup" onClick={
                      () => setIsNavCollapsed(true)}>Sign up</Link></li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
