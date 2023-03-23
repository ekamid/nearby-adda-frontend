import React from "react";
import { useSelector } from "react-redux";

import SingleEvent from "./SingleEvent";
import EventSearchByLocation from "./EventSearchByLocation";
import Preloader from "./Preloader";
import { Box } from "@mui/material";

const EventContainer = ({ selectedEvent, loadMap }) => {
  const { events, fetchingEvents } = useSelector((state) => state.events);

  return (
    <Box height="100vh" overflow="hidden">
      <EventSearchByLocation loadMap={loadMap} />
      {fetchingEvents ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Preloader
            arg={{
              position: "relative",
              left: "unset",
              right: "unset",
              top: "unset",
              transform: "unset",
            }}
          />
        </div>
      ) : events.length ? (
        <div className="event-list">
          {events.map((item, index) => (
            <SingleEvent
              key={index}
              data={item}
              className={`${
                "event-" + item._id === selectedEvent ? "danger" : null
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100">
          <h3>Empty</h3>
        </div>
      )}
    </Box>
  );
};

export default EventContainer;
