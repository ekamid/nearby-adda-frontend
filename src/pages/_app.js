import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../utils/createEmotionCache";

import { RouteGuard } from "@/components/RouteGuard";

import { store } from "@/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <RouteGuard>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </RouteGuard>
        <ToastContainer />
      </Provider>
    </CacheProvider>
  );
}
