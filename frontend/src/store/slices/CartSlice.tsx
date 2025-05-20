import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "./ProductSlice";

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface ICartState {
  customerId: string;
  items: ICartItem[];
}

const initialState: ICartState = {
  customerId: "",
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ICartItem>) {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
    setCustomerId(state, action: PayloadAction<string>) {
      state.customerId = action.payload;
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setCustomerId,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
