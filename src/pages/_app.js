import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { RouteGuard } from "@/components/RouteGuard";

import { store } from "@/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
      <ToastContainer />
    </Provider>
  );
}
