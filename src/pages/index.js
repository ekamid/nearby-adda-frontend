import Head from "next/head";
import EventContainer from "@/components/EventContainer";
import MapContainer from "@/components/MapContainer";
import { useEffect, useState } from "react";
import { useGetEventsQuery } from "@/app/api/eventApi";
import { loadGoogleMapScript } from "@/utils/helpers";
import Preloader from "@/components/Preloader";
import { setFetching } from "@/app/features/EventSlice";
import { useDispatch } from "react-redux";

import { Box, Drawer, Grid } from "@mui/material";
import MessageContainer from "@/components/MessageContainer";
import FilterByLocation from "@/components/FilterbyLocation";
import { useTheme } from "@mui/material/styles";
import Topbar from "@/components/layout/Topbar";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isLoading, isFetching } = useGetEventsQuery();
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  // API key of the google map
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const handleSelectedEvent = (id) => {
    console.log(id);
    setSelectedEvent(id);
  };

  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    //load google map
    loadGoogleMapScript(() => {
      setLoadMap(true);
    }, GOOGLE_MAP_API_KEY);
  }, [GOOGLE_MAP_API_KEY]);

  useEffect(() => {
    dispatch(setFetching(isFetching));
  }, [isFetching]);

  const toggleDrawer = () => setChatDrawerOpen((prev) => !prev);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Home || Loading</title>
          <meta
            name="description"
            content="Find out nearby gathering within specific radius."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="main">
          <Preloader />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home || Nearby Adda</title>
        <meta
          name="description"
          content="Find out nearby gathering within specific radius."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        height="100vh"
        overflow="hidden"
        sx={{
          [theme.breakpoints.down("lg")]: {
            overflow: "scroll",
          },
        }}
      >
        <Topbar />
        <Grid container height="100%">
          <Grid
            item
            xs={12}
            lg={5}
            position="relative"
            order={{ xs: 2, lg: 1 }}
            sx={{
              [theme.breakpoints.down("lg")]: {
                height: "50%",
              },
            }}
          >
            <FilterByLocation loadMap={loadMap} />
            <EventContainer
              toggleDrawer={toggleDrawer}
              selectedEvent={selectedEvent}
            />

            {/* <Footer /> */}
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            order={{ xs: 1, lg: 2 }}
            sx={{
              [theme.breakpoints.down("lg")]: {
                height: "50%",
              },
            }}
          >
            <MapContainer
              handleSelectedEvent={handleSelectedEvent}
              loadMap={loadMap}
            />
            <Drawer anchor="right" open={chatDrawerOpen} onClose={toggleDrawer}>
              <MessageContainer />
            </Drawer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
