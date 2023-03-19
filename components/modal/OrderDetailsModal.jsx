import React from "react";

import { payCoinTextMapper } from "../../data/dropdown";
import { withAsync } from "../../utils/withAsync";
import { fetchPaymentStatus } from "../../services/api/order";
import { stateMap } from "./components";

const CONFIRM_STATUS_MAP = {
  confirmed: true,
  sending: true,
  finished: true,
};

const OrderDetailsModal = ({ isOpen, setOpen, data, orderId }) => {
  const [order, setOrder] = React.useState(null);
  const [error, setError] = React.useState(null);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    if (data && !orderId) {
      setOrder(data);
    }

    if (orderId && !data) {
      getOrderById();
    }
  }, [data, orderId]);

  React.useEffect(() => {
    if (intervalRef.current && !isOpen) {
      clearInterval(intervalRef.current);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (order && !CONFIRM_STATUS_MAP[order.invoice.payment_status]) {
      fetchOrderByInterval();
    }
  }, [order]);

  const getOrderById = async () => {
    setError(null);
    const { response, error } = await withAsync(() =>
      fetchPaymentStatus(orderId)
    );

    if (response.success) {
      setOrder(response);
    } else {
      setError("Order not found.");
    }
  };

  const fetchOrderByInterval = async () => {
    intervalRef.current = setInterval(async () => {
      const { response, error } = await withAsync(() =>
        fetchPaymentStatus(orderId)
      );

      if (
        response.success &&
        CONFIRM_STATUS_MAP[response.invoice.payment_status]
      ) {
        setOrder(response);
        clearInterval(intervalRef.current);
      }
    }, 10000);
  };

  const handleClose = () => {
    setOrder(null);
    setOpen(false);
  };

  if (error) {
    return (
      <div>
        <div className={isOpen ? "modal fade show block" : "modal fade"}>
          <div className="modal-dialog w-full max-w-lg">
            <div className="modal-content border-jacarta-100 dark:border-jacarta-600 border">
              <div className="modal-header">
                <h5 className="font-body text-lg" id="buyNowModalLabel">
                  Not found
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
              <div className="modal-body px-6 py-24">
                <div className="flex items-center justify-center space-x-4">
                  <p className="font-body text-md">Order not found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (order) {
    const { order: orderDetails, invoice } = order;
    const Component = stateMap[orderDetails.status];
    return (
      <div>
        {/* <!-- Buy Now Modal --> */}
        <div className={isOpen ? "modal fade show block" : "modal fade"}>
          <div className="modal-dialog w-full max-w-lg">
            <div className="modal-content border-jacarta-100 dark:border-jacarta-600 border">
              <Component
                orderDetails={orderDetails}
                invoice={invoice}
                setOpen={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={isOpen ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog w-full max-w-lg">
          <div className="modal-content border-jacarta-100 dark:border-jacarta-600 border">
            <div className="modal-header">
              <h5 className="font-body text-lg" id="buyNowModalLabel">
                Loading
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
            <div className="modal-body px-6 py-24">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
