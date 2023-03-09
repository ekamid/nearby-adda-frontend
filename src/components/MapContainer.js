import React, { useState, useEffect } from "react";
import GMap from "./Map";
import Preloader from "./Preloader";

// API key of the google map
const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

// load google map script
const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

const MapContainer = ({ handleSelectedEvent }) => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <div className="map-container">
      {!loadMap ? (
        <Preloader />
      ) : (
        <GMap handleSelectedEvent={handleSelectedEvent} />
      )}
    </div>
  );
};

export default MapContainer;
