import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { store } from "@/app/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
