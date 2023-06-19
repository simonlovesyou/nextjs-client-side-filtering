import { getProducts } from "@/api";
import Product from "@/components/product";
import ProductList from "@/components/product-list";
import { InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Mens = ({ products }: Props) => {
  return <ProductList products={products} filters={[]}></ProductList>;
};

export const getServerSideProps = async () => {
  return {
    props: {
      products: (await getProducts()).filter(
        (product) => product.category === "men's clothing"
      ),
    },
  };
};

export default Mens;
