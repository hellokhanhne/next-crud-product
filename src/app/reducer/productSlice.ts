import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "constant/url";
import { IUpdateProduct, Product } from "interface";
import { showMessage } from "./messageSlice";

export const getProducts = createAsyncThunk("products/get", async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: Product, { dispatch }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, product);
      dispatch(
        showMessage({
          title: `Success`,
          message: "Add product successfully !",
        })
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }: IUpdateProduct, { dispatch }) => {
    try {
      const res = await axios.put(`${BASE_URL}/products/${id}`, product);
      dispatch(
        showMessage({
          title: `Success`,
          message: "Update product successfully !",
        })
      );
      return res.data;
    } catch (error) {}
  }
);
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);

      return { id };
    } catch (error) {}
  }
);

interface IInitState {
  products: Product[];
  updateProductData: Product;
}

const initialState: IInitState = {
  products: [],
  updateProductData: null,
};
const messageSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setUpdateProduct: (state, action) => {
      state.updateProductData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        });
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
      });
  },
});

export const { setUpdateProduct } = messageSlice.actions;

export default messageSlice.reducer;
