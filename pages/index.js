import Head from "next/head";
import Rows from "../components/Rows";
import { useReducer } from "react";

import "tailwindcss/tailwind.css";

const initialState = {
  rows: ["fake", "row"],
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unrecognized action type: " + action.type);
  }
}

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
