import type { ElectronicsProduct, Product as ProductType } from "@/api";
import { getProducts } from "@/api";
import ProductList from "@/components/product-list";
import { InferGetServerSidePropsType } from "next";
import Aside from "@/components/aside";
import { useEnumFilter, useNumberFilter } from "@/hooks";
import Filter from "@/components/filter";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const isElectronicsProduct = (
  product: ProductType
): product is ElectronicsProduct => product.category === "electronics";

const Electronics = ({ products }: Props) => {
  const [priceFilter, setPriceFilter] = useNumberFilter({
    attribute: "price",
    attributes: {
      min: products
        .map((product) => product.price)
        .reduce(
          (priceA, priceB) => Math.min(priceA, priceB),
          Number.MAX_SAFE_INTEGER
        ),
      max: products
        .map((product) => product.price)
        .reduce((priceA, priceB) => Math.max(priceA, priceB), 0),
    },
  });
  const [manufacturer, setManufacturer] = useEnumFilter({
    attribute: "manufacturer" as const,
    attributes: {
      values: products.map((product) => product.manufacturer),
    },
  });
  return (
    <>
      <Aside>
        <Filter
          type="number"
          attribute="price"
          min={priceFilter.min}
          max={priceFilter.max}
          setMaxValue={(maxValue) =>
            setPriceFilter({ min: priceFilter.min, max: maxValue })
          }
          setMinValue={(minValue) =>
            setPriceFilter({ max: priceFilter.max, min: minValue })
          }
        />
      </Aside>
      <ProductList
        products={products}
        filters={[{ attribute: "price", ...priceFilter }]}
      />
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      products: (await getProducts()).filter(isElectronicsProduct),
    },
  };
};

export default Electronics;
