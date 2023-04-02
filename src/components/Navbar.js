import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "./NavItem";
import useWindowWidth from "../hooks/useWindowWidth";

import logo from "../assets/ar-logo.svg";
import iconMenu from "../assets/icon-hamburger.svg";
import iconClose from "../assets/icon-close.svg";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

import "../styles/navbar.scss";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileWidth = 480;

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleTrackShipmentClick() {
    setDropdownVisible(!dropdownVisible);
  }

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
        <NavItem linkName="Pricing" linkURL="/pricing" />
        <NavItem linkName="Contact Sales" linkURL="/contact-sales" />
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
          <div className="dropdown">
            <p>Track your shipment</p>
            <div className="input-container">
              <input type="text" placeholder="Tracking No." />
              <button>
                <BsSearch />
              </button>
            </div>
          </div>
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
