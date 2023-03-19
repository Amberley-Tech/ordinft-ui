import React from "react";

export default function FeeRate({
  feeRateData = [],
  isLoading,
  hasError,
  setFeeRate,
}) {
  const [activeFeeRate, setActiveFeeRate] = React.useState({});

  React.useEffect(() => {
    if (feeRateData.length) {
      setActiveFeeRate(feeRateData[0]);
    }
  }, [feeRateData]);
  const feeRateSelectHandler = (rate) => {
    setFeeRate(rate.feeRate);
    setActiveFeeRate(rate);
  };
  console.log(activeFeeRate);

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row lg:flex-row gap-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse cursor-pointer w-full md:1/3 lg:1/3 text-center dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8"
          >
            <div className="h-2 bg-jacarta-400 mb-4 rounded" />
            <div className="h-2 bg-jacarta-400 mb-4 rounded" />
            <div className="h-2 bg-jacarta-400 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (hasError || !feeRateData.length) {
    return (
      <div className="flex items-center flex-col dark:bg-jacarta-700 gap-3 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
        <h1 className="text-lg normal-case font-body text-jacarta-700 mb-4 text-lg dark:text-white">
          Failed to get fee rates.
        </h1>
        <button
          type="submit"
          className="bg-accent cursor-pointer rounded-full py-2 px-8 text-center font-semibold text-white transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-3">
      {feeRateData.map((rate) => {
        const rateColor =
          rate.type === "Slow"
            ? "dark:text-red text-red"
            : rate.type === "Fast"
            ? "dark:text-orange text-orange"
            : "dark:text-green text-green";

        return (
          <div
            key={rate.id}
            className={`group cursor-pointer w-full md:1/3 lg:1/3 dark:hover:bg-accent hover:bg-accent text-center ${
              activeFeeRate?.id === rate.id
                ? "feerate-active"
                : "dark:bg-jacarta-700"
            } dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white px-8 py-4`}
            onClick={() => feeRateSelectHandler(rate)}
          >
            <p className="font-body font-bold tracking-wide text-jacarta-700 mb-3 text-lg dark:text-white">
              {rate.type}
            </p>
            <p
              className={
                "font-body font-normal normal-case text-jacarta-700 mb-2 text-md " +
                rateColor +
                " group-hover:text-white"
              }
            >
              {rate.price}
            </p>
            <p className="font-body font-normal mb-0 normal-case text-jacarta-700 text-xs dark:text-white">
              {rate.time}
            </p>
          </div>
        );
      })}
    </div>
  );
}
