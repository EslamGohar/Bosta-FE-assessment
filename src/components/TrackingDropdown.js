import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const TrackingDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTrackShipmentClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      {dropdownVisible && (
        <div className="dropdown">
          <input type="text" placeholder="Tracking No." />
          <button>
            <BsSearch />
          </button>
        </div>
      )}
    </>
  );
};

export default TrackingDropdown;
