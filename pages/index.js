import Head from "next/head";
import store from "../state/store";
import { Provider } from "react-redux";
import App from "../components/App";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Homepagerizer"
        openGraph={{
          type: "website",
          locale: "en_US",
          title: "Homepagerizer",
          url: "https://homepagerizer.vercel.app",
          description: "Make simple, fast homepages completely for free.",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap"
          rel="stylesheet"
          key="google-fonts"
        />
      </Head>

      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
}
