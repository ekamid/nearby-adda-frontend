import Head from "next/head";
import EventContainer from "@/components/EventContainer";
import MapContainer from "@/components/MapContainer";
import { useEffect, useState } from "react";
import { useGetEventsQuery } from "@/app/api/eventApi";
import { loadGoogleMapScript } from "@/utils/helpers";
import Preloader from "@/components/Preloader";
import { setFetching } from "@/app/features/EventSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { isLoading, isFetching } = useGetEventsQuery();

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setFetching(isFetching));
  }, [isFetching]);

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
        <div className="row">
          <div className="col-4">
            <EventContainer selectedEvent={selectedEvent} loadMap={loadMap} />
          </div>
          <div className="col-8">
            <MapContainer
              handleSelectedEvent={handleSelectedEvent}
              loadMap={loadMap}
            />
          </div>
        </div>
        {/* <Draggable>
          <div>
            <FloatingMenu />
          </div>
        </Draggable> */}
      </div>
    </>
  );
}
