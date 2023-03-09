export const getPathQueryParams = ({
  limit,
  page,
  search,
  radius,
  latitude,
  longitude,
}) => {
  let pathQueryParams = "";

  if (limit) {
    pathQueryParams += `limit=${limit}&`;
  }

  if (page) {
    pathQueryParams += `page=${page}&`;
  }

  if (search) {
    pathQueryParams += `search=${search}&`;
  }

  if (radius && latitude && longitude) {
    pathQueryParams += `radius=${radius}&latitude=${latitude}&longitude=${longitude}&`;
  }

  // Remove the trailing ampersand
  pathQueryParams = pathQueryParams.slice(0, -1);

  return pathQueryParams;
};

// load google map script
export const loadGoogleMapScript = (callback, apiKey) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};
