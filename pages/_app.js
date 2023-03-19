import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import Meta from "../components/Meta";
import { useRef } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  let scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <>
      <Meta title="Home 1" />

      <ThemeProvider enableSystem={true} attribute="class">
        <Layout>
          <Component {...pageProps} scrollRef={scrollRef} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
