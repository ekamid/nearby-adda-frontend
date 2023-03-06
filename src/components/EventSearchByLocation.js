import React from "react";
import { BiMap } from "react-icons/bi";

const EventSearchByLocation = () => {
  return (
    <div className="event-search-container ">
      <input
        type="text"
        name="address"
        id="address"
        placeholder="Search your address"
      />
      <button>
        <BiMap size={22} />
      </button>
      <select>
        <option className="5">5</option>
        <option className="5">10</option>
        <option className="5">15</option>
        <option className="5">20</option>
      </select>
    </div>
  );
};

export default EventSearchByLocation;
