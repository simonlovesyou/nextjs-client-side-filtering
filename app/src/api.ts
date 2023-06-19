import { faker } from "@faker-js/faker";
interface BaseProduct {
  id: number;
  title: string;
  price: number;
  category: "women's clothing" | "men's clothing" | "electronics" | "jewelery";
  description: string;
  image: string;
  color?: "red" | "black" | "green" | "white";
  manufacturer?: "nvidia" | "philips";
  material?: "gold" | "silver" | "steel";
}

export interface ClothingProduct extends BaseProduct {
  category: "men's clothing" | "women's clothing";
  color: "red" | "black" | "green" | "white";
}

export interface ElectronicsProduct extends BaseProduct {
  category: "electronics";
  manufacturer: "nvidia" | "philips";
}

export interface JeweleryProduct extends BaseProduct {
  category: "jewelery";
  material: "gold" | "silver" | "steel";
}

export type Product = ClothingProduct | ElectronicsProduct | JeweleryProduct;

type Lol = keyof ElectronicsProduct;

export const getProducts = async () => {
  const result = await fetch("https://fakestoreapi.com/products");

  return ((await result.json()) as Product[]).map((product) => {
    const transformedProduct = {
      ...product,
      price: Number(product.price),
    };
    if (product.category === "electronics") {
      return {
        ...transformedProduct,
        manufacturer: faker.helpers.arrayElement([
          "nvidia",
          "philips",
        ] as const),
      };
    }
    if (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    ) {
      return {
        ...transformedProduct,
        color: faker.helpers.arrayElement([
          "red",
          "black",
          "green",
          "white",
        ] as const),
      };
    }
    return {
      ...transformedProduct,
      material: faker.helpers.arrayElement([
        "silver",
        "steel",
        "gold",
      ] as const),
    };
  });
};
