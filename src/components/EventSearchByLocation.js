import { useGetEventsQuery } from "@/app/api/eventApi";
import { errorToast } from "@/utils/toastify";
import React, { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";

const EventSearchByLocation = ({ loadMap }) => {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(5);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [query, setQuery] = useState("");

  const handleScriptLoad = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search-box")
    );
    setAutocomplete(autocomplete);

    autocomplete.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    // Do something with the selected place
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const { refetch, isLoading } = useGetEventsQuery({
    radius: radius,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  useEffect(() => {
    const data = localStorage.getItem("currentLocation");

    if (data) {
      const parsed = JSON.parse(data);
      setRadius(parsed.radius);
      setAddress(parsed.address);
      setLocation({
        address: parsed.address,
        latitude: parsed.latitude,
        longitude: parsed.longitude,
      });

      refetch();
    }
  }, []);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      errorToast("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );

          const data = await response.json();

          setAddress(data.display_name);

          setLocation({
            address: data.display_name,
            latitude: data.lat,
            longitude: data.lon,
          });

          const currentLocation = {
            address: data.display_name,
            latitude: data.lat,
            longitude: data.lon,
            radius,
          };

          localStorage.setItem(
            "currentLocation",
            JSON.stringify(currentLocation)
          );
        },
        () => {
          errorToast("Unable to retrieve your location");
        }
      );
    }
  };

  // const placeWidget = usePlacesWidget({
  //   apiKey: GOOGLE_MAP_API_KEY,
  //   options: {
  //     types: ["establishment"],
  //     componentRestrictions: { country: "bd" },
  //   },
  //   onPlaceSelected: (place) => {
  //     const { formatted_address, geometry } = place;
  //     const { location } = geometry;
  //     const { lat, lng } = location;

  //     setAddress(address);
  //     setLocation({
  //       address: formatted_address,
  //       latitude: lat(),
  //       longitude: lng(),
  //     });

  //     const data = localStorage.getItem("currentLocation");

  //     if (data) {
  //       const parsed = JSON.parse(data);

  //       console.log(parsed);

  //       parsed.address = formatted_address;
  //       parsed.latitude = lat();
  //       parsed.longitude = lng();

  //       localStorage.setItem("currentLocation", JSON.stringify(parsed));
  //     }
  //   },
  // });

  const handleAddress = (e) => {
    setAddress(e.target.value);
    handleScriptLoad();
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
    const data = localStorage.getItem("currentLocation");

    if (data) {
      const parsed = JSON.parse(data);
      parsed.radius = e.target.value;

      localStorage.setItem("currentLocation", JSON.stringify(parsed));
    }
  };

  return (
    <div className="event-search-container ">
      <input
        type="text"
        name="address"
        onChange={handleAddress}
        id="search-box"
        // ref={placeWidget.ref}
        value={address}
        placeholder="Search your address"
      />
      <button onClick={getLocation}>
        <BiMap size={22} />
      </button>
      <select onChange={handleRadius}>
        <option value={null}>Radius</option>

        {[...Array(100).keys()].map((item) =>
          item > 0 && item % 5 === 0 ? (
            <option
              selected={radius == item ? true : false}
              key={item}
              value={item}
            >
              {item}KM
            </option>
          ) : null
        )}
      </select>
    </div>
  );
};

export default EventSearchByLocation;
