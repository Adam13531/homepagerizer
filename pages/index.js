import Head from "next/head";
import store from "../state/store";
import { Provider } from "react-redux";
import App from "../components/App";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Homepagerizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}
