import React from "react";
import type { InferGetServerSidePropsType } from "next";
import Product from "@/components/product";
import ProductList from "@/components/product-list";
import { getProducts } from "@/api";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home({ products }: Props) {
  return <ProductList products={products}></ProductList>;
}

export const getServerSideProps = async () => {
  return {
    props: {
      products: await getProducts(),
    },
  };
};
