import React from "react";
import { useSelector } from "react-redux";

import SingleEvent from "./SingleEvent";
import EventSearchByLocation from "./EventSearchByLocation";
import Preloader from "./Preloader";
import { Box, Grid } from "@mui/material";

const EventContainer = ({ selectedEvent, toggleDrawer }) => {
  const { events, fetchingEvents } = useSelector((state) => state.events);

  return (
    <Box>
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
          <Grid
            container
            sx={{
              padding: "10px",
              flexDirection: { xs: "column", md: "row" },
              overflowY: { xs: "scroll", md: "unset" },
            }}
          >
            {events.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                lg={12}
                xl={6}
                sx={{ padding: "10px" }}
              >
                <SingleEvent
                  toggleDrawer={toggleDrawer}
                  key={index}
                  data={item}
                  className={`${
                    "event-" + item._id === selectedEvent ? "danger" : null
                  }`}
                />
              </Grid>
            ))}
          </Grid>
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
