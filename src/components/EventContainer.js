import React, { useRef } from "react";
import { useSelector } from "react-redux";

import SingleEvent from "./SingleEvent";
import Preloader from "./Preloader";
import { Box, Grid } from "@mui/material";

const EventContainer = ({ selectedEvent, toggleDrawer }) => {
  const { events, fetchingEvents } = useSelector((state) => state.events);
  return (
    <Box>
      {fetchingEvents ? (
        <Preloader />
      ) : events.length ? (
        <div className="event-list">
          <Grid
            container
            sx={{
              padding: "10px",
              // marginBottom: "10rem",
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
                  selected={item._id === selectedEvent}
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
