import axios from "axios";
import { BASE_URL } from "constant/url";
import { Product } from "interface";

export const getIdProducts = async () => {
  const products = (await axios.get(`${BASE_URL}/products`)).data;

  return products.map((p: Product) => ({
    params: {
      id: `${p.id}`,
    },
  }));
};

export const getOneProduct = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};
