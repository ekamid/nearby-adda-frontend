import Head from "next/head";
import { Inter } from "@next/font/google";
import EventContainer from "@/components/EventContainer";
import MapContainer from "@/components/MapContainer";
import { useState } from "react";
import { useGetEventsQuery } from "@/app/api/eventApi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { refetch: refetchBook, isLoading: isLoading } = useGetEventsQuery();

  const handleSelectedEvent = (id) => {
    setSelectedEvent(id);
  };
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
        <EventContainer selectedEvent={selectedEvent} />
        <MapContainer handleSelectedEvent={handleSelectedEvent} />

        {/* <Draggable>
          <div>
            <FloatingMenu />
          </div>
        </Draggable> */}
      </div>
    </>
  );
}
