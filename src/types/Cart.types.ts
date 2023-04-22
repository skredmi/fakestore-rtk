export interface ICart {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: {
    rate: number;
  };
}

export type Category =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
