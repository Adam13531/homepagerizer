import Head from "next/head";
import Rows from "../components/Rows";
import reducer from "../misc/reducer";
import { useReducer } from "react";

import "tailwindcss/tailwind.css";
import "rc-tooltip/assets/bootstrap.css";

const initialState = {
  rows: [],
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <Head>
        <title>Homepagerizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Rows state={state} dispatch={dispatch} />
      </main>
    </div>
  );
}
