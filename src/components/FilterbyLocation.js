import { useGetEventsQuery } from "@/app/api/eventApi";
import { setFetching } from "@/app/features/EventSlice";
import { errorToast } from "@/utils/toastify";
import React, { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Instruction from "./tooltips/Instruction";
import { Box, Button, Grid, MenuItem, TextField, Select } from "@mui/material";
import { scrollToTop } from "@/utils/helpers";


const FilterByLocation = ({ loadMap }) => {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(5);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const { refetch, isLoading, isFetching } = useGetEventsQuery(
    {
      radius: radius,
      latitude: location.latitude,
      longitude: location.longitude,
    },
    {
      skip: shouldFetchData,
    }
  );

  const handlePlaceSearchAndSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search-box")
    );

    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        var place = autocomplete.getPlace();
        setAddress(place.formatted_address);
        setLocation({
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });

        setShouldFetchData(false);

        const data = localStorage.getItem("currentLocation");

        if (data) {
          const parsed = JSON.parse(data);
          parsed.address = place.formatted_address;
          parsed.latitude = place.geometry.location.lat();
          parsed.longitude = place.geometry.location.lng();

          localStorage.setItem("currentLocation", JSON.stringify(parsed));
        }
      }
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("currentLocation");

    if (data) {
      const parsed = JSON.parse(data);
      setAddress(parsed.address);
      setRadius(parsed.radius);
      setLocation({
        address: parsed.address,
        latitude: parsed.latitude,
        longitude: parsed.longitude,
      });

      setShouldFetchData(false);
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldFetchData) {
      refetch();
      dispatch(setFetching(isFetching));
    }
  }, [location, radius, setShouldFetchData]);

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

  const handleAddress = (e) => {
    setAddress(e.target.value);
    handlePlaceSearchAndSelect();
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
    const data = localStorage.getItem("currentLocation");
    setShouldFetchData(false);

    if (data) {
      const parsed = JSON.parse(data);
      parsed.radius = e.target.value;

      localStorage.setItem("currentLocation", JSON.stringify(parsed));
    }
  };

  const hanldeOnFocus = (e) => {
    const element = document.getElementById(e.target.id);
    scrollToTop(element);
  };

  return (
    <Instruction
      title={
        <React.Fragment>
          <Typography color="inherit">
            Type or Select Current Location to see events
          </Typography>
        </React.Fragment>
      }
      open={address ? false : true}
    >
      <Box
        id="filterMenu"
        sx={{
          backgroundColor: "#fff",
          padding: "20px 10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="search-box"
              name="address"
              type="text"
              value={address}
              onFocus={hanldeOnFocus}
              onBlur={hanldeOnFocus}
              onChange={handleAddress}
              placeholder="Search your address"
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              value={10}
              onChange={handleRadius}
            >
              {[...Array(100).keys()].map((item) =>
                item > 0 && item % 5 === 0 ? (
                  <MenuItem
                    key={item}
                    value={item}
                    selected={radius == item ? true : false}
                  >
                    {item}KM
                  </MenuItem>
                ) : null
              )}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                height: "100%",
              }}
              variant="contained"
              color="primary"
              size="large"
              onClick={getLocation}
            >
              <BiMap size={22} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Instruction>
  );
};

export default FilterByLocation;
