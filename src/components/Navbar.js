import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { fetchShipment } from "../redux/slices/shipment";
import { NavItem } from "./NavItem";
import useWindowWidth from "../hooks/useWindowWidth";

import logo from "../assets/en-logo.svg";
import iconMenu from "../assets/icon-hamburger.svg";
import iconClose from "../assets/icon-close.svg";
import "../styles/navbar.scss";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileWidth = 480;

  const getTrackingNumber = (e) => {
    e.preventDefault();
    dispatch(fetchShipment(trackingNumber));
  };

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleTrackShipmentClick() {
    setDropdownVisible(!dropdownVisible);
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownRef]);

  const menuIcon = (
    <img
      src={iconMenu}
      alt="hamburger-icon"
      className="menu-icon"
      onClick={toggleMenu}
    />
  );

  const closeIcon = (
    <img
      src={iconClose}
      alt="close-icon"
      className="close-icon"
      onClick={toggleMenu}
    />
  );

  const links = (
    <div className="navbar">
      {windowWidth < mobileWidth ? closeIcon : ""}
      <div>
        <NavItem linkName="Home" linkURL="/home" />
        <NavItem linkName="Contact Sales" linkURL="/contact-sales" />
        <NavItem linkName="Pricing" linkURL="/pricing" />
      </div>
      <div>
        <div className="trackShipment">
          <span>
            <IoIosArrowBack />
          </span>
          <NavItem
            linkName="Track Shipment"
            linkURL="/"
            onClick={handleTrackShipmentClick}
          />
        </div>

        {dropdownVisible && (
          <form
            onSubmit={getTrackingNumber}
            ref={dropdownRef}
            className="dropdown"
          >
            <p>Track your shipment</p>
            <div className="input-container">
              <input
                type="text"
                placeholder="Tracking No."
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button type="submit">
                <BsSearch />
              </button>
            </div>
          </form>
        )}
        <NavItem linkName="Login" linkURL="/login" />
      </div>
    </div>
  );

  return (
    <nav>
      <NavLink to="/">
        <img src={logo} alt="Bosta-logo" className="logo" />
      </NavLink>

      {windowWidth > mobileWidth ? links : showMenu ? links : menuIcon}
    </nav>
  );
};

export default Navbar;
