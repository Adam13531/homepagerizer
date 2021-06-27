import Head from "next/head";
import Rows from "../components/Rows";
import HTMLDropzone from "../components/HTMLDropzone";
import reducer from "../misc/reducer";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import useKeyboardListener from "../hooks/useKeyboardListener";
import useUrlEffects from "../hooks/useUrlEffects";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColorPickers from "../components/ColorPickers";
import Preview from "../components/Preview";
import store from "../state/store";
import { Provider } from "react-redux";

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

  useUrlEffects(dispatch);
  useKeyboardListener(state, dispatch);

  return (
    <div className="container">
      <Head>
        <title>Homepagerizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <main>
          <HTMLDropzone dispatch={dispatch} />
          <DndProvider backend={HTML5Backend}>
            <Rows state={state} dispatch={dispatch} />
            <ColorPickers />
            <Preview state={state} />
            <ToastContainer
              position="top-left"
              autoClose={5000}
              closeOnClick
              pauseOnHover
            />
          </DndProvider>
        </main>
      </Provider>
    </div>
  );
}
