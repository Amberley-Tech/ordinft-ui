import Link from "next/link";
import { FaTwitterSquare, FaDiscord } from "react-icons/fa";

const footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="w-full dark:bg-jacarta-900 page-footer bg-white">
        <div className="container py-6 w-full flex justify-between">
          <p className="tracking-wide dark:text-white font-display text-md">
            OrdiNFTs © 2023
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com/ordinft" target={"_blank"}>
              <FaTwitterSquare
                className="dark:text-white text-jacarta-700"
                size="24px"
              />
            </a>
            <a href="https://discord.gg/EhUPN6ZVEB" target={"_blank"}>
              <FaDiscord
                className="dark:text-white text-jacarta-700"
                size="24px"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
