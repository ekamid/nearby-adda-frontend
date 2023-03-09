import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GMap from "./Map";
import Preloader from "./Preloader";

const MapContainer = ({ handleSelectedEvent, loadMap }) => {
  const { events } = useSelector((state) => state.events);

  return (
    <div className="map-container">
      {!loadMap ? (
        <Preloader />
      ) : (
        <GMap handleSelectedEvent={handleSelectedEvent} events={events} />
      )}
    </div>
  );
};

export default MapContainer;
