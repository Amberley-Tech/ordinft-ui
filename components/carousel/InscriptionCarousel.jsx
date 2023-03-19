import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { formatDistance } from "date-fns";
import { payCoinTextMapper } from "../../data/dropdown";

const InscriptionCarousel = ({ inscriptions }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {inscriptions.map((inscription, idx) => {
          const formattedDate = formatDistance(
            new Date(inscription.createdAt),
            new Date(),
            {
              addSuffix: true,
            }
          );

          const explorerUrlPrefix =
            inscription.network === "btc"
              ? `https://ordinals.com/content/${inscription.inscriptionId}`
              : "/ltc.svg";
          function handleInscriptionClick() {
            const url =
              inscription.network === "btc"
                ? `https://ordinals.com/inscription/${inscription.inscriptionId}`
                : `https://litecoin.earlyordies.com/inscription/${inscription.inscriptionId}`;
            window.open(url, "_blank");
          }
          return (
            <SwiperSlide className="text-white" key={idx}>
              <article>
                <div
                  onClick={handleInscriptionClick}
                  className="cursor-pointer dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500"
                >
                  <figure>
                    {/* {`item/${itemLink}`} */}
                    <div className="w-full">
                      <Image
                        src={explorerUrlPrefix}
                        alt={"explorerUrlPrefix"}
                        height={230}
                        width={230}
                        layout="responsive"
                        objectFit="cover"
                        className="rounded-[0.625rem] w-full"
                        loading="lazy"
                      />
                    </div>
                  </figure>
                  <div className="relative mt-4 flex items-center justify-between">
                    <span className="w-[30%] font-body text-jacarta-700 text-base dark:text-white">
                      Owner
                    </span>

                    <span className="w-[70%] dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                      <Tippy content={<span>{inscription.address}</span>}>
                        <span className="truncate text-green text-sm font-medium tracking-tight">
                          {inscription.address}
                        </span>
                      </Tippy>
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      Network
                    </span>
                    <span className="flex gap-2 dark:text-jacarta-100 text-jacarta-700">
                      <span>
                        <img
                          className="w-4 h-4"
                          src={payCoinTextMapper[inscription.network].image}
                          alt="network"
                        />
                      </span>
                      {payCoinTextMapper[inscription.network].name}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      Date
                    </span>
                    <span className="dark:text-jacarta-100 text-jacarta-700">
                      {formattedDate}
                    </span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div className="group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default InscriptionCarousel;
