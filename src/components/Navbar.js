import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { fetchShipment } from "../redux/slices/shipment";
import { NavItem, LanguageSwitcher } from "./index";
import useWindowWidth from "../hooks/useWindowWidth";

import { useTranslation } from "react-i18next";
// import cookies from "js-cookie";

import logo from "../assets/en-logo.svg";
import iconMenu from "../assets/icon-hamburger.svg";
import iconClose from "../assets/icon-close.svg";
import "../styles/navbar.scss";

// const language = {
//   en: {
//     code: "en",
//     name: "ENG",
//     country_code: "gb",
//   },
//   ar: {
//     code: "ar",
//     name: "عربي",
//     dir: "rtl",
//     country_code: "ar-eg",
//   },
// };

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileWidth = 480;

  // language
  const { t } = useTranslation();
  // const currentLanguageCode = cookies.get("i18next") || "en";
  // const currentLanguage = language[currentLanguageCode];
  // let { pathname } = useLocation();

  const getTrackingNumber = (e) => {
    e.preventDefault();
    dispatch(fetchShipment(trackingNumber));
  };

  // responsive navbar menu
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

  // useEffect(() => {
  //   document.body.dir = currentLanguage.dir || "ltr";
  //   if (pathname === "/") {
  //     document.title = t("title.home");
  //   } else if (pathname.includes("tracking-shipment")) {
  //     document.title = t(`title.tracking-shipment`);
  //   } else {
  //     document.title = t(`title.${pathname.substring(1)}`);
  //   }
  //   setAnchorEl(null);
  // }, [currentLanguage, t, pathname]);

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
        <NavItem linkName={t("title.home")} linkURL="/home" />
        <NavItem linkName={t("title.contact-sales")} linkURL="/contact-sales" />
        <NavItem linkName={t("title.pricing")} linkURL="/pricing" />
      </div>
      <div>
        <div className="trackShipment" onClick={handleTrackShipmentClick}>
          <NavItem linkName={t("title.track-shipment")} linkURL="/" />
          <span>
            <IoIosArrowDown />
          </span>
        </div>
        {dropdownVisible && (
          <form
            onSubmit={getTrackingNumber}
            ref={dropdownRef}
            className="dropdown"
          >
            <p>{t("tracking_search.header")}</p>
            <div className="input-container">
              <input
                type="text"
                placeholder={t("tracking_search.placeholder")}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button type="submit">
                <BsSearch />
              </button>
            </div>
          </form>
        )}
        <NavItem linkName={t("title.sign-in")} linkURL="/sign-in" />
        <div className="langDropdown">
          <LanguageSwitcher />
        </div>
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
