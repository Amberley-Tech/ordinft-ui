import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { HeadLine } from "../component";
import "tippy.js/dist/tippy.css";
import InscriptionCarousel from "../carousel/InscriptionCarousel";
import { withAsync } from "../../utils/withAsync";
import { getAllInscriptions } from "../../services/api/inscription";

const LatestInscriptions = ({ classes = "pt-10 pb-24", bgWhite }) => {
  const [status, setStatus] = React.useState("idle");
  const [inscriptions, setInscriptions] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    setStatus("pending");
    const { response, error } = await withAsync(() => getAllInscriptions(page));

    if (response?.success) {
      setInscriptions(response.inscriptions);
      setStatus("success");
    } else {
      setStatus("failed");
    }
  };
  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      {bgWhite && (
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
      )}
      <div className="container">
        <HeadLine
          text="Latest Inscriptions"
          // image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <InscriptionCarousel inscriptions={inscriptions} />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export default LatestInscriptions;
