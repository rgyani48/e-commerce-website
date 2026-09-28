import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* Logo */}
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </Link>

            {/* Navigation */}
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 text-secondary">
                  Home <i className="fa-solid fa-house"></i>
                </Link>
              </li>

              <li>
                <Link to="/features" className="nav-link px-2 text-white">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/pricing" className="nav-link px-2 text-white">
                  Pricing
                </Link>
              </li>

              <li>
                <Link to="/cart" className="nav-link px-2 text-white">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/my-orders" className="nav-link px-2 text-white">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/about" className="nav-link px-2 text-white">
                  About
                </Link>
              </li>

              <li>
                <Link to="/profile" className="nav-link px-2 text-white">
                  Profile
                </Link>
              </li>
            </ul>

            {/* Search */}
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
              onSubmit={searchHandler}
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Buttons */}
            <div className="text-end">
              <Link to="/signup" className="btn btn-warning me-2">
                Sign-up
              </Link>

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Sign-Out
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
