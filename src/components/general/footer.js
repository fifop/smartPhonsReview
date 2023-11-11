import React from 'react'

import  './footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
    <footer className="footer mt-auto py-3 bg-light">
    <div className="container">
      <span className="text-muted"></span>
      <div className="footer-links ">
     <Link to="/about" className="footer-link ">About Us</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </div>
    </div>
  </footer>
  )
}
