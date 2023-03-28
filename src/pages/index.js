import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useGetEventsQuery } from "@/app/api/eventApi";
import Preloader from "@/components/Preloader";
import { setFetching } from "@/app/features/EventSlice";
import { useDispatch } from "react-redux";
import GoogleMap from "@/utils/GoogleMap";
import HomeContainer from "@/components/HomeContainer";

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

export default function Home() {
  const { isLoading, isFetching } = useGetEventsQuery();
  const dispatch = useDispatch();

  const gMap = useMemo(() => new GoogleMap(), []);

  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    //load google map
    gMap.loadMapScript(() => {
      setLoadMap(true);
    }, GOOGLE_MAP_API_KEY);
  }, [gMap]);

  useEffect(() => {
    dispatch(setFetching(isFetching));
  }, [isFetching, dispatch]);

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

      <HomeContainer loadMap={loadMap} />
    </>
  );
}
