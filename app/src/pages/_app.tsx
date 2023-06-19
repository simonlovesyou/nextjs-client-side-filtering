import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { getProducts } from "@/api";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      products: await getProducts(),
    },
  };
};
