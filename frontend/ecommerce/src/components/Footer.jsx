
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">E-Commerce</h5>
            <p className="text-secondary">
              Your trusted online shopping platform. Explore products,
              compare prices, and enjoy a simple and convenient shopping
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/features"
                  className="text-secondary text-decoration-none"
                >
                  Features
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/pricing"
                  className="text-secondary text-decoration-none"
                >
                  Pricing
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-secondary text-decoration-none"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-secondary text-decoration-none"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>

            <p className="text-secondary mb-2">
              <i className="fa-solid fa-envelope me-2"></i>
              support@example.com
            </p>

            <p className="text-secondary mb-2">
              <i className="fa-solid fa-phone me-2"></i>
              +91 98765 43210
            </p>

            <p className="text-secondary">
              <i className="fa-solid fa-location-dot me-2"></i>
              Bhubaneswar, Odisha, India
            </p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-secondary">
              © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a
              href="#"
              className="text-white me-3"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>

            <a
              href="#"
              className="text-white me-3"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="#"
              className="text-white me-3"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a
              href="#"
              className="text-white"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

