import React from "react";
import SingleEvent from "./SingleEvent";

import { nearbyAddaData } from "../data";
import EventSearchByLocation from "./EventSearchByLocation";

const EventContainer = ({ selectedEvent }) => {
  return (
    <div className="event-container">
      <EventSearchByLocation />
      <div className="event-list">
        {nearbyAddaData.map((item, index) =>
          index === nearbyAddaData.length - 1 ? (
            <SingleEvent
              key={index}
              data={item}
              className={`last-event ${
                "event-" + item.id === selectedEvent ? "selected-event" : ""
              }`}
            />
          ) : (
            <SingleEvent
              key={index}
              data={item}
              className={`${
                "event-" + item.id === selectedEvent ? "selected-event" : ""
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default EventContainer;
