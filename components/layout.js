import Footer from "./footer";
import { useRouter } from "next/router";
import Header01 from "./header/Header01";

export default function Layout({ children }) {
  const route = useRouter();
  // header start
  let header = <Header01 />;

  // header end

  return (
    <>
      {header}
      <main>{children}</main>
      <Footer />
    </>
  );
}
