import React from "react";
import { payCoinTextMapper } from "../../../data/dropdown";

export default function Processing({ setOpen, orderDetails, invoice }) {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="buyNowModalLabel">
          Processing your order
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

        {/* <!-- Terms --> */}
        <div className="mt-4 flex flex-col justify-center gap-2">
          <span className="normal-case dark:text-jacarta-200 text-sm">
            Note: Confirmation might take sometime if there is congestion at
            payment gateway.
          </span>
        </div>
      </div>
      {/* <!-- end body --> */}

      <div className="modal-footer">
        <div className="flex items-center justify-center space-x-4">
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-8 h-8 text-accent animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
