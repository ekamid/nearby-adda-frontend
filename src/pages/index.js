import Head from "next/head";
import EventContainer from "@/components/EventContainer";
import MapContainer from "@/components/MapContainer";
import { useEffect, useState } from "react";
import { useGetEventsQuery } from "@/app/api/eventApi";
import { loadGoogleMapScript } from "@/utils/helpers";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { isLoading } = useGetEventsQuery();

  // API key of the google map
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const handleSelectedEvent = (id) => {
    setSelectedEvent(id);
  };

  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    //load google map
    loadGoogleMapScript(() => {
      setLoadMap(true);
    }, GOOGLE_MAP_API_KEY);
  }, [GOOGLE_MAP_API_KEY]);

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
      <div className="main">
        <EventContainer selectedEvent={selectedEvent} loadMap={loadMap} />
        <MapContainer
          handleSelectedEvent={handleSelectedEvent}
          loadMap={loadMap}
        />

        {/* <Draggable>
          <div>
            <FloatingMenu />
          </div>
        </Draggable> */}
      </div>
    </>
  );
}
