import React, { useEffect, useRef } from "react";

const Map = ({ handleSelectedEvent, events }) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    googleMap = initGoogleMap(
      {
        lat: events.length ? events[0].latitude : 0,
        lng: events.length ? events[0].latitude : 0,
      },
      15
    );
    let bounds = new window.google.maps.LatLngBounds();
    events.map((x) => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); // the map to contain all markers
  }, [events]);

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);

    if (element) {
      handleSelectedEvent(id);

      const cardRect = element.getBoundingClientRect();
      const parentRect = element.parentElement.getBoundingClientRect();

      if (cardRect.top <= parentRect.top) {
        window.scrollTo({ top: cardRect.top + window.pageYOffset });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
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
      title: markerObj.name,
      id: `event-${markerObj._id}`,
      icon: {
        url: `https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png`,
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },
      animation: window.google.maps.Animation.DROP,
      draggable: true, // Make the marker draggable
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

      googleMap.setZoom(21);
      googleMap.panTo(marker.getPosition());

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
