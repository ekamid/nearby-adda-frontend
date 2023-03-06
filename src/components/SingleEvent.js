import React from "react";
import { BiMap } from "react-icons/bi";

const SingleEvent = ({ data, className }) => {
  const { title, address, description, id } = data;

  return (
    <div
      className={`single-event-container ${className}`}
      id={`event-${data.id}`}
    >
      <img src={`${data.imageUrl}`} alt={data.title} />
      <h1>{title}</h1>
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
