import React from "react";
import { payCoinTextMapper } from "../../../data/dropdown";
import Link from "next/link";

export default function Success({ setOpen, orderDetails, invoice }) {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="buyNowModalLabel">
          🎉 Order completed 🎉
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 h-6 w-6 dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </button>
      </div>

      {/* <!-- Body --> */}
      <div className="modal-body p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
            Order ID
          </span>
          <span className="normal-case font-body text-jacarta-700 text-sm dark:text-white">
            {orderDetails.orderId}
          </span>
        </div>

        <div className="dark:border-jacarta-600 border-jacarta-100 relative flex items-center border-t border-b py-4">
          <div className="font-display text-jacarta-700 text-base font-semibold dark:text-white">
            Paid to
          </div>

          <div className="ml-auto">
            <div className="w-80 relative">
              <span className="select-all truncate block w-full dark:bg-jacarta-700 dark:border-green border-green rounded-full border py-3 px-4 dark:text-white dark:placeholder-white">
                {invoice.pay_address}
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Total --> */}
        <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-start justify-between border-b py-2.5">
          <span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
            Total
          </span>
          <div className="ml-auto">
            <span className="flex items-center whitespace-nowrap">
              <span className="mr-1">
                <img
                  src={payCoinTextMapper[orderDetails.payCoinName].image}
                  className="h-4 w-4"
                />
              </span>
              <span className="text-green font-medium tracking-tight">
                {invoice.pay_amount}{" "}
                {payCoinTextMapper[orderDetails.payCoinName].name}
              </span>
            </span>
            <div className="dark:text-jacarta-300 text-right">
              ${invoice.price_amount}
            </div>
          </div>
        </div>

        {/* <!-- Inscription IDs --> */}
        <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex flex-col justify-start border-b py-2.5">
          <span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
            Inscription IDs
          </span>
          <div className="flex flex-col mt-4">
            {orderDetails.inscriptionId.map((inscription) => {
              return (
                <a
                  href={`https://ordinals.com/inscription/${inscription.id}`}
                  className="dark:bg-jacarta-600 dark:border-jacarta-500 border-jacarta-100 rounded-2.5xl relative flex items-center border bg-white px-4 py-2 transition-shadow hover:shadow-lg"
                >
                  <div>
                    <h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
                      {inscription.name}
                    </h3>
                  </div>

                  <div className="dark:border-jacarta-600 border-jacarta-100 ml-auto rounded-full border px-3 py-0">
                    View on Explorer
                  </div>
                </a>
              );
            })}
            {orderDetails.inscriptionId.length < 1 ? (
              <p className="font-body text-jacarta-700 hover:text-accent dark:text-white">
                No Inscriptions recorded.
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {/* <!-- end body --> */}
    </>
  );
}
