import { Product } from "@/api";

const Product = (props: Product) => {
  return (
    <div className="flex flex-col ">
      <div className="w-full h-24">
        <img src={props.image} alt={props.description} className="h-full" />
      </div>
      <h2>{props.title}</h2>
      <p>{props.category}</p>
      <p>{props.price}</p>
    </div>
  );
};

export default Product;
