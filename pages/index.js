import React, { useContext, useEffect } from "react";
import { Hero, LatestInscriptions, NewseLatter } from "../components/component";
import Meta from "../components/Meta";

export default function Home({ scrollRef }) {
  useEffect(() => {
    window.scrollTo(0, scrollRef.current.scrollPos);
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY;
    };
    window.addEventListener("scroll", handleScrollPos);
    return () => {
      window.removeEventListener("scroll", handleScrollPos);
    };
  });

  return (
    <main>
      <Meta title="Home" />
      <Hero />
      <LatestInscriptions />
      <NewseLatter />
    </main>
  );
}
