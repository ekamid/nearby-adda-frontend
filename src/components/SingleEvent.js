import React from "react";
import { BiMap } from "react-icons/bi";

import { Box } from "@mui/material";

const SingleEvent = ({ data, className }) => {
  const { name, address, imageUrl, description, _id } = data;

  return (
    <div className={`single-event-container ${className}`} id={`event-${_id}`}>
      <img src={`${imageUrl}`} alt={data.name} />
      <h1>{name}</h1>
      <h3>
        <BiMap /> {address}
      </h3>
      <p>{description}</p>
      <div className="footer">
        <button className="join-btn">Join</button>
        <button className="cancel-btn">Cancel</button>
        <button className="message-btn">Chat</button>
      </div>
    </div>
  );
};

export default SingleEvent;
