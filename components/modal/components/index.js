import Pending from "./Pending";
import Processing from "./Processing";
import Success from "./Success";

export const stateMap = {
  PENDING: Pending,
  PROCESSING: Processing,
  COMPLETED: Success,
};
