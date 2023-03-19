import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { withAsync } from "../utils/withAsync";
import { fetchCurrencyEstimates } from "../services/api/payments";
import { btcToSats, satsToBtc } from "../utils/inscribeHelpers";

const initialState = {
  optimize: true,
  feeRateData: [],
  inscriptionNetwork: "btc",
  files: [],
  fileNamesWithInscriptionFee: [],
  feeRate: null,
  serviceFeePerFile: 0,
  serviceFeePerFileUSD: 5,
  totalServiceFee: 0,
  totalInscriptionFee: 0,
  receiveAddress: "",
  totalFee: 0,
  totalFeeUSD: 0,
  orderType: "single",
  payCoinName: "btc",
  payCoinAmount: 0,
};

export const useInscribeStore = create(
  devtools(
    immer((set, get) => ({
      formState: { ...initialState },
      showSummary: false,
      setOptimize(val) {
        set((state) => {
          state.formState.optimize = val;
        });
      },
      setFeeRateData(feeRateData) {
        set((state) => {
          state.formState.feeRateData = feeRateData;
        });
      },
      setInscriptionNetwork(name) {
        set((state) => {
          state.formState.inscriptionNetwork = name;
        });
      },
      setFiles(files) {
        set((state) => {
          state.formState.files = files;
        });
      },
      setFileNamesWithInscriptionFee(data) {
        set((state) => {
          state.formState.fileNamesWithInscriptionFee = data;
        });
      },
      setFeeRate(rate) {
        set((state) => {
          state.formState.feeRate = rate;
        });
      },
      setServiceFeePerFile(amount) {
        set((state) => {
          state.formState.serviceFeePerFile = amount;
        });
      },
      setServiceFeePerFileUSD(amount) {
        set((state) => {
          state.formState.serviceFeePerFileUSD = amount;
        });
      },
      setTotalServiceFee(amount) {
        set((state) => {
          state.formState.totalServiceFee = amount;
        });
      },
      setTotalInscriptionFee(amount) {
        set((state) => {
          state.formState.totalInscriptionFee = amount;
        });
      },
      setReceiveAddress(address) {
        set((state) => {
          state.formState.receiveAddress = address;
        });
      },
      setTotalFee(amount) {
        set((state) => {
          state.formState.totalFee = amount;
        });
      },
      setOrderType(orderType) {
        set((state) => {
          state.formState.orderType = orderType;
        });
      },
      setPayCoinName(name) {
        set((state) => {
          state.formState.payCoinName = name;
        });
      },
      setPayCoinAmount(amount) {
        set((state) => {
          state.formState.payCoinAmount = amount;
        });
      },
      setTotalFeeUSD(amount) {
        set((state) => {
          state.formState.totalFeeUSD = amount;
        });
      },
      setShowSummary(val) {
        set((state) => {
          state.showSummary = val;
        });
      },
      async calculateSummary(files, network, feeRate, paymentCurrency) {
        const globalState = get();
        const { _, response: serviceFeePerFileInSatsEstimates } =
          await withAsync(() =>
            fetchCurrencyEstimates({
              from: "usd",
              to: network,
              amount: globalState.formState.serviceFeePerFileUSD,
            })
          );

        const { estimated_amount: serviceFeePerFileInSats } =
          serviceFeePerFileInSatsEstimates;
        const estimatedServiceFeePerFileInSats = btcToSats(
          serviceFeePerFileInSats
        );
        const serviceFeeForAllFilesInSats =
          files.length * estimatedServiceFeePerFileInSats;
        //

        const totalInscriptionFee = calculateTotalInscriptionFee(
          files,
          feeRate
        );

        const totalFeeInSats =
          totalInscriptionFee + serviceFeeForAllFilesInSats;
        const totalFeeInBtc = satsToBtc(totalFeeInSats);

        const { error, response: totalFeeInUsdResponse } = await withAsync(() =>
          fetchCurrencyEstimates({
            from: network,
            to: "usd",
            amount: `${totalFeeInBtc}`,
          })
        );

        const { estimated_amount: totalFeeInUSD } = totalFeeInUsdResponse;
        console.log({ totalFeeInUsdResponse });
        const payCoinAmount = await getPayCoinAmount(
          network,
          totalFeeInBtc,
          paymentCurrency
        );

        set((state) => {
          state.formState.serviceFeePerFile = estimatedServiceFeePerFileInSats;
          state.formState.totalServiceFee = serviceFeeForAllFilesInSats;
          state.formState.totalInscriptionFee = totalInscriptionFee;
          state.formState.totalFee = totalFeeInSats;
          state.formState.totalFeeUSD = (+totalFeeInUSD).toFixed(2);
          state.formState.payCoinAmount = payCoinAmount;
        });
      },
      resetFormState() {
        set((state) => {
          state.formState = { ...initialState };
          state.showSummary = false;
        });
      },
    }))
  )
);

const getPayCoinAmount = async (network, totalFee, coinName) => {
  const { error, response } = await withAsync(() =>
    fetchCurrencyEstimates({
      from: network,
      to: coinName,
      amount: `${totalFee}`,
    })
  );
  console.log({ response }, "paycoin");
  const { estimated_amount } = response;

  return estimated_amount;
};

const calculateTotalInscriptionFee = (files, feeRate) => {
  return files.reduce((acc, cur) => {
    const inscribeFee = (cur.size / 4) * feeRate;

    return acc + inscribeFee;
  }, 0);
};
