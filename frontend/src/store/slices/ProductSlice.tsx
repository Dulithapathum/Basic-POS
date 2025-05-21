import type { Product } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products`
    );
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addProduct = createAsyncThunk<
  Product,
  FormData,
  { rejectValue: string }
>("product/addProduct", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", data.get("name") as string);
    formData.append("category", data.get("category") as string);
    formData.append("description", data.get("description") as string);
    formData.append("price", data.get("price") as string);
    formData.append("countInStock", data.get("countInStock") as string);
    formData.append("image", data.get("image") as File);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add product"
    );
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        fetchProducts.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Something went wrong";
        }
      )
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
