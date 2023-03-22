// import "@/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";

// import { RouteGuard } from "@/components/RouteGuard";

// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";

// export default function App({ Component, pageProps }) {
//   return (
// <Provider store={store}>
//   <RouteGuard>
//     <Component {...pageProps} />
//   </RouteGuard>
//   <ToastContainer />
// </Provider>
//   );
// }

import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme/theme";
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
