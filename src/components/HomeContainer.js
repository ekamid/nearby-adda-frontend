import EventContainer from "@/components/EventContainer";
import MapContainer from "@/components/MapContainer";
import { useState } from "react";

import { Box, Drawer, Grid } from "@mui/material";
import MessageContainer from "@/components/MessageContainer";
import FilterByLocation from "@/components/FilterbyLocation";
import { useTheme } from "@mui/material/styles";
import Topbar from "@/components/layout/Topbar";

const HomeContainer = ({ loadMap }) => {
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => setChatDrawerOpen((prev) => !prev);

  return (
    <Box height="100vh" overflow="hidden">
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
          <EventContainer toggleDrawer={toggleDrawer} />
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
          <MapContainer loadMap={loadMap} />
          <Drawer anchor="right" open={chatDrawerOpen} onClose={toggleDrawer}>
            <MessageContainer />
          </Drawer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeContainer;
