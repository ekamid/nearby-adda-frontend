class GoogleMap {
  ref = null;
  map = null;
  marker = null;

  constructor(ref = null) {
    console.log("changeee");
    this.ref = ref;
  }

  loadMapScript = (callback, apiKey) => {
    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = src;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
  };

  initMap = (position, zoomLevel) => {
    this.map = new window.google.maps.Map(this.ref.current, {
      center: position,
      zoom: zoomLevel,
    });

    return this.map;
  };

  createMarker = (markerObj) => {
    this.marker = new window.google.maps.Marker({
      position: { lat: markerObj.latitude, lng: markerObj.longitude },
      map: this.map,
      title: markerObj.name,
      id: markerObj._id,
      icon: {
        url: `https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png`,
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },
      animation: window.google.maps.Animation.DROP,
      draggable: true, // Make the marker draggable
    });

    return this.marker;
  };
}

export default GoogleMap;
