export interface Product {
  id?: number;
  productName: string;
  urlImage: string;
  price: number;
  createDate: string;
  updateDate: string;
}

export interface IUpdateProduct {
  id: number;
  product: Product;
}
