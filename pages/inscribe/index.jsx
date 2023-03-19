import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import BlockchainDropdown from "../../components/dropdown/BlockchainDropdown";
import {
  collectionDropdown2_data,
  BlockchainDropdownData,
  PaymentCurrencyDropdownData,
  payCoinTextMapper,
} from "../../data/dropdown";
import Meta from "../../components/Meta";
import { useInscribeStore } from "../../zustand/store";
import {
  isValidBTCAddress,
  isValidLTCAddress,
} from "../../utils/inscribeHelpers";
import { withAsync } from "../../utils/withAsync";
import { fetchBtcFeeRates, fetchLtcFeeRates } from "../../services/api/app";
import PaymentCurrencyDropdown from "../../components/dropdown/PaymentCurrencyDropdown";
import FeeRate from "./components/FeeRate";
import FilesUpload from "./components/FilesUpload";
import { createOrder } from "../../services/api/order";
import OrderDetailsModal from "../../components/modal/OrderDetailsModal";
import { useOrdersStore } from "../../zustand/ordersStore";

const Inscribe = () => {
  const [
    showSummary,
    orderType,
    serviceFeePerFile,
    payCoinAmount,
    totalFeeUSD,
    totalFee,
    totalServiceFee,
    totalInscriptionFee,
    payCoinName,
    files,
    feeRate,
    feeRateData,
    optimize,
    inscriptionNetwork,
    receiveAddress,
    setOptimize,
    setReceiveAddress,
    setFeeRate,
    setFeeRateData,
    setServiceFeePerFileUSD,
    setOrderType,
    setFiles,
    calculateSummary,
    setShowSummary,
    toggleOrderDetailsModal,
    resetFormState,
  ] = useInscribeStore((state) => [
    state.showSummary,
    state.formState.orderType,
    state.formState.serviceFeePerFile,
    state.formState.payCoinAmount,
    state.formState.totalFeeUSD,
    state.formState.totalFee,
    state.formState.totalServiceFee,
    state.formState.totalInscriptionFee,
    state.formState.payCoinName,
    state.formState.files,
    state.formState.feeRate,
    state.formState.feeRateData,
    state.formState.optimize,
    state.formState.inscriptionNetwork,
    state.formState.receiveAddress,
    state.setOptimize,
    state.setReceiveAddress,
    state.setFeeRate,
    state.setFeeRateData,
    state.setServiceFeePerFileUSD,
    state.setOrderType,
    state.setFiles,
    state.calculateSummary,
    state.setShowSummary,
    state.toggleOrderDetailsModal,
    state.resetFormState,
  ]);
  const [setOrderToLocalStorage] = useOrdersStore((state) => [state.setOrder]);
  const [validAddress, setValidAddress] = useState(null);

  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isFeeRatesLoading, setIsFeeRatesLoading] = useState(true);
  const [isFeeRatesHasError, setIsFeeRatesHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (receiveAddress) {
      let valid = false;

      if (inscriptionNetwork === "ltc") {
        valid = isValidLTCAddress(receiveAddress);
      } else {
        valid = isValidBTCAddress(receiveAddress);
      }

      setValidAddress(valid);
    }

    if (inscriptionNetwork === "ltc") {
      fetchFeeRates("ltc");
    } else {
      fetchFeeRates();
    }

    if (showSummary) {
      setIsSummaryLoading(true);
    }
  }, [inscriptionNetwork]);

  useEffect(() => {
    if (files.length) {
      calculateSummaryHandler();
    }
  }, [files, feeRate, payCoinName]);

  const calculateSummaryHandler = async () => {
    setShowSummary(true);
    setIsSummaryLoading(true);
    await calculateSummary(files, inscriptionNetwork, feeRate, payCoinName);
    setIsSummaryLoading(false);
  };

  const handleAddressChange = (e) => {
    let valid = false;

    if (inscriptionNetwork === "ltc") {
      valid = isValidLTCAddress(e.target.value);
    } else {
      valid = isValidBTCAddress(e.target.value);
    }

    setReceiveAddress(e.target.value);

    setValidAddress(valid);
  };

  const fetchFeeRates = async (network = "btc") => {
    setIsFeeRatesLoading(true);
    if (network === "btc") {
      const { response, error } = await withAsync(fetchBtcFeeRates);
      if (response) {
        const fastest = response.fastestFee > 12 ? response.fastestFee : 18;
        const feeRates = [
          {
            id: 1,
            type: "Slow",
            price: `${response.economyFee} sats/vB`,
            time: "> 24h",
            feeRate: response.economyFee,
          },
          {
            id: 2,
            type: "Fast",
            price: `${response.halfHourFee} sats/vB`,
            time: "~ 1h",
            feeRate: response.halfHourFee,
          },
          {
            id: 3,
            type: "Turbo",
            price: `${fastest} sats/vB`,
            time: "~ 30m",
            feeRate: fastest,
          },
        ];
        setFeeRate(response.economyFee);
        setFeeRateData(feeRates);
        setIsFeeRatesLoading(false);
      }
      if (error) {
        setIsFeeRatesHasError(true);
        setIsFeeRatesLoading(false);
      }
    }

    if (network === "ltc") {
      const { response, error } = await withAsync(fetchLtcFeeRates);

      if (response) {
        const highFeeInBytes = Math.ceil(response.high_fee_per_kb / 1000);
        const mediumFeeInBytes = Math.ceil(response.medium_fee_per_kb / 1000);
        const lowFeeInBytes = Math.ceil(response.low_fee_per_kb / 1000);

        const feeRates = [
          {
            id: 1,
            type: "Slow",
            price: `${lowFeeInBytes} litoshis/vB`,
            time: "> 6h",
            feeRate: lowFeeInBytes,
          },
          {
            id: 2,
            type: "Fast",
            price: `${mediumFeeInBytes} litoshis/vB`,
            time: "~ 30m",
            feeRate: mediumFeeInBytes,
          },
          {
            id: 3,
            type: "Turbo",
            price: `${highFeeInBytes} litoshis/vB`,
            time: "~ 15m",
            feeRate: highFeeInBytes,
          },
        ];
        setFeeRate(lowFeeInBytes);
        setFeeRateData(feeRates);
        setServiceFeePerFileUSD(4);
        setIsFeeRatesLoading(false);
      }

      if (error) {
        setIsFeeRatesHasError(true);
        setIsFeeRatesLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    const payload = {
      inscriptionNetwork,
      files,
      totalFee,
      totalFeeUSD,
      serviceFeePerFile,
      totalServiceFee,
      totalInscriptionFee,
      feeRate,
      orderType,
      receiveAddress,
      payCoinAmount,
      payCoinName,
    };

    setIsSubmitting(true);
    const { response, error } = await withAsync(() => createOrder(payload));

    if (response.success) {
      setOrder(response);
      setOrderToLocalStorage({
        createdAt: Date.now(),
        id: response.order.orderId,
        network: response.order.inscriptionNetwork,
      });
      setIsModalOpen(true);
      resetFormState();
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };

  const currencyUnit = inscriptionNetwork === "btc" ? "sats" : "litoshis";

  return (
    <div>
      <Meta title="Inscribe" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Inscribe your Ordinals
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- File Upload --> */}
            <FilesUpload
              files={files}
              setFiles={setFiles}
              optimize={optimize}
              setOptimize={setOptimize}
              setOrderType={setOrderType}
            />

            {/* <!-- Blockchain --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Blockchain
              </label>

              {/*Blockchain dropdown */}
              <div className="dropdown relative mb-4 cursor-pointer ">
                <BlockchainDropdown data={BlockchainDropdownData} />
              </div>
            </div>

            {/* <!-- Address --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Address<span className="text-red">*</span>
              </label>
              {validAddress === false && (
                <p className="dark:text-red text-red text-2xs mb-3">
                  Please enter a valid {inscriptionNetwork} address.
                </p>
              )}
              <input
                type="text"
                value={receiveAddress}
                onChange={handleAddressChange}
                id="inscribe-address"
                className={
                  validAddress === true
                    ? "dark:bg-jacarta-700 normal-case border-green hover:ring-green/10 focus:ring-green focus:border-green dark:border-green dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                    : validAddress === false
                    ? "dark:bg-jacarta-700 normal-case border-red hover:ring-red/10 focus:ring-red focus:border-red dark:border-red dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                    : "dark:bg-jacarta-700 normal-case border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                }
                placeholder="Wallet Address"
                required
              />
            </div>

            {/* <!-- Fee rate --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Fee Rate<span className="text-red">*</span>
              </label>
              <FeeRate
                hasError={isFeeRatesHasError}
                isLoading={isFeeRatesLoading}
                feeRateData={feeRateData}
                setFeeRate={setFeeRate}
              />
            </div>

            {/* <!-- Payment currency --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Payment Currency
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                You can pay using the following currencies available
              </p>

              {/*payment dropdown */}
              <div className="dropdown relative mb-4 cursor-pointer ">
                <PaymentCurrencyDropdown data={PaymentCurrencyDropdownData} />
              </div>
            </div>

            {/* Order summary  */}
            {showSummary && (
              <div className="mb-6">
                <label
                  htmlFor="item-supply"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Order Summary
                </label>
                <div className="flex flex-row w-full text-center dark:bg-green bg-green dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white">
                  <div className="w-1/3 p-4">
                    <img src="/images/pay.png" alt="pay" />
                  </div>
                  {isSummaryLoading && (
                    <div className="w-2/3 animate-pulse flex justify-center flex-col p-8">
                      <div className="flex flex-row gap-8 justify-center">
                        <div className="flex w-1/3 gap-2 flex-col justify-center items-end">
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                        </div>
                        <div className="flex w-2/3 gap-3 flex-col justify-center items-center">
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                        </div>
                      </div>
                      <div className="flex mt-4 py-4 border-t-2 flex-row justify-center gap-14">
                        <div className="flex w-1/3 flex-col justify-center items-end">
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                        </div>
                        <div className="flex w-2/3 flex-col justify-center items-center">
                          <div className="h-2 w-full bg-jacarta-100 mb-4 rounded" />
                        </div>
                      </div>
                    </div>
                  )}
                  {!isSummaryLoading && (
                    <div className="w-2/3 flex justify-center flex-col p-8">
                      <div className="flex flex-row gap-8 justify-center">
                        <div className="flex w-1/3 gap-2 flex-col justify-center items-end">
                          <p className="text-right text-jacarta-700 font-body text-xl dark:text-white">
                            Network Fee
                          </p>
                          <p className="text-right text-jacarta-700 font-body text-xl dark:text-white">
                            Service Fee
                          </p>
                        </div>
                        <div className="flex w-2/3 gap-3 flex-col justify-center items-end">
                          <p className="tracking-wider text-jacarta-700 font-body text-lg dark:text-white">
                            {totalInscriptionFee} {currencyUnit}
                            {/* <span className="text-base ml-2">~ $4.12</span> */}
                          </p>
                          <p className="tracking-wider text-jacarta-700 font-body text-lg dark:text-white">
                            {totalServiceFee} {currencyUnit}
                            {/* <span className="text-base ml-2">~ $4.12</span> */}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-4 py-4 border-t-2 flex-row justify-center gap-14">
                        <div className="flex w-1/3 flex-col justify-center items-end gap-2">
                          <p className="text-right text-jacarta-700 font-body text-lg dark:text-white">
                            Total Fee
                          </p>
                          <p className="text-right text-jacarta-700 font-body text-lg dark:text-white">
                            You pay
                          </p>
                        </div>
                        <div className="flex w-2/3 flex-col justify-center items-end gap-2">
                          <p className="tracking-wider text-jacarta-700 font-body text-md dark:text-white">
                            {totalFee} {currencyUnit}
                            <span className="text-base ml-2">
                              ~ ${totalFeeUSD}
                            </span>
                          </p>
                          <p className="tracking-wider text-jacarta-700 font-body text-md dark:text-white">
                            ~ {payCoinAmount}{" "}
                            {payCoinTextMapper[payCoinName].name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* <!-- Submit --> */}
            <div className="w-full flex justify-center mt-8">
              <button
                disabled={
                  isSummaryLoading ||
                  !showSummary ||
                  !validAddress ||
                  isSubmitting
                }
                onClick={handleSubmit}
                className={`rounded-full py-3 px-16 text-center font-semibold text-white transition-all ${
                  isSummaryLoading ||
                  !showSummary ||
                  !validAddress ||
                  isSubmitting
                    ? "bg-accent-lighter cursor-default"
                    : "bg-accent cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-6 h-6 mr-3 text-white animate-spin"
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
                    Placing Order...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      <OrderDetailsModal
        data={order}
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
      />
      {/* <!-- end create --> */}
    </div>
  );
};

export default Inscribe;
