import { NavLink } from "react-router-dom";

const NavItem = ({ linkURL, linkName, onClick }) => {
  return (
    <NavLink
      to={linkURL}
      className={`
        navbar-link
        ${({ isActive }) => (isActive ? "active" : "")}
      `}
      onClick={onClick}
    >
      {linkName}
    </NavLink>
  );
};

export default NavItem;
