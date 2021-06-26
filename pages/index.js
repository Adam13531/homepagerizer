import Head from "next/head";
import Rows from "../components/Rows";
import reducer from "../misc/reducer";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import useKeyboardListener from "../misc/useKeyboardListener";

import "tailwindcss/tailwind.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  rows: [],

  /**
   * If this is null, no items are listening for a hotkey. Otherwise, it's the
   * specific item that's waiting for a hotkey. There can only be one such item
   * at a time.
   * @type {?string}
   */
  itemIdListeningForHotkey: null,

  /**
   * This will just refer to the event.key string property like "b" or "Escape".
   * @type {?string}
   */
  lastPressedHotkey: null,
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useKeyboardListener(state, dispatch);

  return (
    <div className="container">
      <Head>
        <title>Homepagerizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Rows state={state} dispatch={dispatch} />
        <ToastContainer
          position="top-left"
          autoClose={5000}
          closeOnClick
          pauseOnHover
        />
      </main>
    </div>
  );
}
