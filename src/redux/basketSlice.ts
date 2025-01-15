import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductSampleItem {
  sku: number;
  name: string;
  description: string;
  price: number;
  basketLimit: number;
}

export interface BasketItem extends ProductSampleItem {
  quantity: number;
}

export interface BasketState {
  items: Record<string, BasketItem>;
  totalQuantity: number;
  totalPrice: number;
}

export const initialState: BasketState = {
  items: {},
  totalQuantity: 0,
  totalPrice: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (
      state,
      action: PayloadAction<Omit<BasketItem, "quantity">>
    ) => {
      const item = action.payload;

      if (!state.items[item.sku]) {
        if (1 <= item.basketLimit) {
          state.items[item.sku] = { ...item, quantity: 1 };
          state.totalQuantity += 1;
          state.totalPrice += item.price;
        }
      } else if (state.items[item.sku].quantity < item.basketLimit) {
        state.items[item.sku].quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    removeFromBasket: (
      state,
      action: PayloadAction<{ sku: number; price: number }>
    ) => {
      const { sku, price } = action.payload;
      if (state.items[sku]?.quantity > 0) {
        state.items[sku].quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= price;

        if (state.items[sku].quantity === 0) {
          delete state.items[sku];
        }
      }
    },
    removeAll: (
      state,
      action: PayloadAction<{ sku: string; price: number; quantity: number }>
    ) => {
      const { sku, price, quantity } = action.payload;
      if (state.items[sku]) {
        state.totalQuantity -= quantity;
        state.totalPrice -= quantity * price;
        delete state.items[sku];
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ sku: number; quantity: number; price: number }>
    ) => {
      const { sku, quantity, price } = action.payload;
      const diff = quantity - state.items[sku].quantity;
      state.totalQuantity += diff;
      state.totalPrice += diff * price;
      state.items[sku].quantity = quantity;
    },
  },
});

export const { addToBasket, removeFromBasket, removeAll, updateQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;
