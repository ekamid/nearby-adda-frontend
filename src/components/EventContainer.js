import React from "react";
import { useSelector } from "react-redux";

import SingleEvent from "./SingleEvent";
import EventSearchByLocation from "./EventSearchByLocation";
import { useGetEventsQuery } from "@/app/api/eventApi";

const EventContainer = ({ selectedEvent }) => {
  const { events } = useSelector((state) => state.events);

  return (
    <div className="event-container">
      <EventSearchByLocation />
      {events.length ? (
        <div className="event-list">
          {events.map((item, index) =>
            index === events.length - 1 ? (
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
      ) : (
        <div className="d-flex align-items-center justify-content-center w-100">
          <h3>Empty</h3>
        </div>
      )}
    </div>
  );
};

export default EventContainer;
