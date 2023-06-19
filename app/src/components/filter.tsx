import { Product } from "@/api";

type NumberFilter = {
  type: "number";
  attribute: keyof Product;
  min: number;
  max: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
};
type BooleanFilter = {
  type: "boolean";
  value: boolean;
  setValue: (value: boolean) => void;
};

type Filter = NumberFilter | BooleanFilter;

type Props = Filter;

const Filter = (props: Props) => {
  if (props.type === "number") {
    return (
      <div className="flex flex-col">
        <span>{props.attribute}</span>
        <input
          type="number"
          onChange={(event) => props.setMinValue(Number(event.target.value))}
          placeholder="Min"
        />
        <input
          type="number"
          onChange={(event) => props.setMaxValue(Number(event.target.value))}
          placeholder="Max"
        />
      </div>
    );
  } else {
    return <div />;
  }
};

export default Filter;
