import React, { useEffect, useRef } from "react";
import { nearbyAddaData } from "../data";

const Map = ({ handleSelectedEvent }) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    googleMap = initGoogleMap(
      {
        lat: nearbyAddaData[0].latitude,
        lng: nearbyAddaData[0].longitude,
      },
      17
    );
    var bounds = new window.google.maps.LatLngBounds();
    nearbyAddaData.map((x) => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); // the map to contain all markers
  }, []);

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);

    if (element) {
      handleSelectedEvent(id);
      let parent = element.parentNode;
      let parentRect = parent.getBoundingClientRect();
      let childRect = element.getBoundingClientRect();

      if (
        childRect.top < parentRect.top ||
        childRect.bottom > parentRect.bottom
      ) {
        parent.scrollTo({
          top: element.offsetTop - parent.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // initialize the google map
  const initGoogleMap = (position, zoomLevel) => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: position,
      zoom: zoomLevel,
    });
  };

  let currentInfowWindow = null;
  let scrollTo = null;

  // create marker on google map
  const createMarker = (markerObj) => {
    const infoWindow = new window.google.maps.InfoWindow();
    const marker = new window.google.maps.Marker({
      position: { lat: markerObj.latitude, lng: markerObj.longitude },
      map: googleMap,
      title: markerObj.title,
      id: `event-${markerObj.id}`,
      icon: {
        url: "https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png",
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });

    //clickable info marker

    marker.addListener("click", () => {
      if (scrollTo !== marker.id) {
        handleClickScroll(marker.id);
      }

      if (currentInfowWindow) {
        currentInfowWindow.close();
      }

      currentInfowWindow = infoWindow;
      scrollTo = marker.id;

      infoWindow.setContent(`<h1>${marker.title}</h1>`);
      infoWindow.open(marker.map, marker);
    });

    return marker;
  };

  useEffect(() => {
    if (googleMap) {
      window.google.maps.event.addListener(googleMap, "click", function () {
        currentInfowWindow.close();
      });
    }
  }, [googleMap]);

  return <div ref={googleMapRef} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
