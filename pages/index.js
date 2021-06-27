import Head from "next/head";
import Rows from "../components/Rows";
import reducer from "../misc/reducer";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import useKeyboardListener from "../misc/useKeyboardListener";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColorPickers from "../components/ColorPickers";
import Preview from "../components/Preview";

import "tailwindcss/tailwind.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  rows: [],

  bgColor: "#ffffff",
  textColor: "#000000",
  linkColor: "#3275f4",
  accentColor: "#4100ff",
  hoverColor: "#e7e7e7",

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
        <DndProvider backend={HTML5Backend}>
          <Rows state={state} dispatch={dispatch} />
          <ColorPickers state={state} dispatch={dispatch} />
          <Preview state={state} />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            closeOnClick
            pauseOnHover
          />
        </DndProvider>
      </main>
    </div>
  );
}
