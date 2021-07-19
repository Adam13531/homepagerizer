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
          images: [
            {
              url: "https://user-images.githubusercontent.com/7192897/126023490-e18c267e-d3fa-4025-b9bd-090917e15b18.png",
              width: 512,
              height: 512,
              alt: "Homepagerizer logo",
            },
          ],
        }}
      />
      <Head>
        <link rel="icon" href="/icon.svg" />
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
