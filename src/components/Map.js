import React, { useEffect, useRef } from "react";
import GoogleMap from "@/utils/GoogleMap";
import { scrollToTop } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { setSelectedEvent } from "@/app/features/EventSlice";

const Map = ({ events }) => {
  const googleMapRef = useRef(null);
  const gMap = new GoogleMap(googleMapRef); //creating intence for googleMap
  let googleMap = gMap.map;

  const dispatch = useDispatch();

  useEffect(() => {
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
    googleMap = gMap.initGoogleMap(
      {
        lat: events.length ? events[0].latitude : 0,
        lng: events.length ? events[0].latitude : 0,
      },
      15
    );

    let bounds = new window.google.maps.LatLngBounds();

    events.map((x) => {
      const marker = markerWithInfoWindow(x);
      bounds.extend(marker.position);
    });

    googleMap.fitBounds(bounds); // the map to contain all markers
  }, [events]);

  const handleSelectedEvent = (id) => {
    const element = document.getElementById(id);
    if (element) {
      dispatch(setSelectedEvent(id));
      scrollToTop(element);
    }
  };

  let currentInfowWindow = null;

  const markerWithInfoWindow = (markerObj) => {
    const infoWindow = new window.google.maps.InfoWindow();
    const marker = gMap.createMarker(markerObj);

    //clickable info marker
    marker.addListener("click", () => {
      handleSelectedEvent(marker.id);

      //if current infowindow is is visible, close it or assign infowindow to current infowindow
      if (currentInfowWindow) currentInfowWindow.close();
      currentInfowWindow = infoWindow;

      //zoom the google map to the and center the position of marker just has clicked
      googleMap.setZoom(21);
      googleMap.panTo(marker.getPosition());

      //set content and open the marker info window
      infoWindow.setContent(`<h1>${marker.title}</h1>`);
      infoWindow.open(marker.map, marker);
    });

    return marker;
  };

  //current info window close if anywhere of the google map is clicked
  useEffect(() => {
    if (googleMap) {
      window.google.maps.event.addListener(googleMap, "click", function () {
        currentInfowWindow.close();
      });
    }
  }, [googleMap, currentInfowWindow]);

  return <div ref={googleMapRef} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
