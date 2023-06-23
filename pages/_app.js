import GlobalStyle from "../styles";
import Head from "next/head";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>ArtistsReferenceOrganizer</title>
      </Head>
      <Component
        {...pageProps}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={handleOnClick}
      />
    </>
  );

  function handleOnClick() {
    // Toggle sidebarOpen true/ false
    setSideBarOpen(!sideBarOpen);
  }
}
