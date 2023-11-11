import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '../services/apiService';
import './home.css';
import Footer from '../components/general/footer';

export default function Home() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const userData = localStorage.getItem(TOKEN_KEY);

  return (
    <>
      <div className="container-fluid p-2 shadow">
        <header className='home-header'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">Home</Link>
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
              <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                  {localStorage[TOKEN_KEY] ? (
                    <>
                      <li className="nav-item">
                        <Link className='nav-link' to="/user-company">Companies</Link>
                      </li>
                      <li className="nav-item">
                        <Link className='nav-link' to="/devices">Devices</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className='nav-link' to="/Login">Log in</Link>
                      </li>
                      <li className="nav-item">
                        <Link className='nav-link' to="/Signup">Sign up</Link>
                      </li>
                    </>
                  )}
                </ul>
                {localStorage[TOKEN_KEY] && (
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className='nav-link' to="/user-info">{userData.name}</Link>
                    </li>
                  </ul>
                )}
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
