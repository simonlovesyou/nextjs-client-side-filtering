import { ElectronicsProduct, Product as ProductType } from "@/api";
import Product from "./product";

type Filter<T extends ProductType, TAttribute extends keyof T> = {
  [Key in TAttribute]: T[Key] extends number
    ? { type: "number"; min: number; max: number; attribute: TAttribute }
    : never;
}[TAttribute][];

type Props<T extends ProductType, TFilters extends Filter<T, keyof T>> = {
  products: T[];
  filters?: TFilters;
};

const ProductList = <
  T extends ProductType,
  TFilters extends Filter<T, keyof T>
>(
  props: Props<T, TFilters>
) => {
  return (
    <ul className="grid grid-cols-3">
      {props.products
        .filter((product) =>
          props.filters?.some((filter) =>
            filter.type === "number"
              ? (product[filter.attribute] as number) >= filter.min &&
                (product[filter.attribute] as number) <= filter.max
              : false
          )
        )
        .map((product) => (
          <Product key={product.id} {...product} />
        ))}
    </ul>
  );
};

export default ProductList;
