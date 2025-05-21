export type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
};

export type Customer = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
};
