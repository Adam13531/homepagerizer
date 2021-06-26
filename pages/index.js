import Head from "next/head";

import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Homepagerizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Hello world</div>
      </main>
    </div>
  );
}
