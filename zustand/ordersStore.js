import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useOrdersStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        orders: [],
        setOrder(order) {
          set((state) => {
            state.orders.push(order);
          });
        },
      })),
      {
        name: "orders",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
