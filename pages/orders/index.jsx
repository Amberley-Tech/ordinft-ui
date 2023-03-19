import React from "react";
import Image from "next/image";
import Meta from "../../components/Meta";
import { useOrdersStore } from "../../zustand/ordersStore";
import moment from "moment";
import { payCoinTextMapper } from "../../data/dropdown";
import OrderDetailsModal from "../../components/modal/OrderDetailsModal";

const Index = () => {
  const [orders, setOrders] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchOrderById, setSearchOrderById] = React.useState("");
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  React.useEffect(() => {
    const localOrders = useOrdersStore.getState().orders;
    setOrders(localOrders);
  }, []);

  const handleRowClick = (id) => {
    setSelectedOrderId(id);
    setIsOpen(true);
  };

  const handleOpen = (val) => {
    if (val === false) {
      setSelectedOrderId(null);
    }

    setIsOpen(val);
  };

  if (orders) {
    return (
      <>
        <Meta title="Orders" />
        {/* <!-- Rankings --> */}
        <section className="relative py-24 h-[calc(100vh_-_72px)]">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <Image
              src="/images/gradient_light.jpg"
              layout="fill"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Orders
            </h1>

            {/* <!-- Table --> */}
            <div className="scrollbar-custom overflow-x-auto">
              <div className="py-4 px-2 w-full flex justify-end">
                <div className="max-w-lg w-full relative">
                  <input
                    type="text"
                    value={searchOrderById}
                    placeholder="Order ID"
                    onChange={(evt) => setSearchOrderById(evt.target.value)}
                    className="normal-case dark:bg-jacarta-700 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 w-full rounded-full border py-3 px-4 dark:text-white dark:placeholder-white"
                  />
                  <button
                    className="hover:bg-accent-dark font-display bg-accent absolute top-2 right-2 rounded-full px-6 py-2 text-sm text-white"
                    onClick={(e) => {
                      setSelectedOrderId(searchOrderById);
                      setIsOpen(true);
                    }}
                  >
                    Find Order
                  </button>
                </div>
              </div>
              <div
                role="table"
                className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 lg:rounded-2lg w-full min-w-[736px] border bg-white text-sm dark:text-white"
              >
                <div
                  className="dark:bg-jacarta-600 bg-jacarta-50 rounded-t-2lg flex"
                  role="row"
                >
                  <div className="w-[50%] py-3 px-4" role="columnheader">
                    <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                      Order ID
                    </span>
                  </div>
                  <div className="w-[20%] py-3 px-4" role="columnheader">
                    <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                      Network
                    </span>
                  </div>
                  <div className="w-[30%] py-3 px-4" role="columnheader">
                    <span className="text-jacarta-700 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                      Created At
                    </span>
                  </div>
                </div>
                {orders.map((item, idx) => {
                  const { id, createdAt, network } = item;
                  const networkObj = payCoinTextMapper[network];
                  return (
                    <div
                      className="cursor-pointer flex transition-shadow hover:shadow-lg"
                      role="row"
                      key={id}
                      onClick={() => handleRowClick(id)}
                    >
                      <div
                        className="dark:border-jacarta-600 border-jacarta-100 flex w-[50%] items-center border-t py-4 px-4"
                        role="cell"
                      >
                        <span className="mr-2 lg:mr-4 normal-case">{id}</span>
                      </div>
                      <div
                        className="dark:border-jacarta-600 border-jacarta-100 flex w-[20%] items-center whitespace-nowrap border-t py-4 px-4"
                        role="cell"
                      >
                        <img
                          className="w-4 h-4 mr-2"
                          src={networkObj.image}
                          alt="network"
                        />
                        <span className="text-sm font-medium tracking-tight">
                          {networkObj.name}
                        </span>
                      </div>
                      <div
                        className="dark:border-jacarta-600 border-jacarta-100 flex w-[30%] items-center border-t py-4 px-4"
                        role="cell"
                      >
                        <span className={`text-white`}>
                          {moment(createdAt).format("lll")}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {orders.length < 1 ? (
                  <div className="flex transition-shadow hover:shadow-lg h-40 justify-center items-center">
                    <p className="text-lg">No orders</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <OrderDetailsModal
            isOpen={isOpen}
            setOpen={handleOpen}
            orderId={selectedOrderId}
          />
        </section>
        {/* <!-- end orders --> */}
      </>
    );
  }

  return null;
};

export default Index;
