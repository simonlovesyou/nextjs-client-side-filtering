import { Product } from "@/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SetOptional } from "type-fest";

type NumberFilter = {
  attribute: keyof Product;
  type: "number";
  attributes: {
    min: number;
    max: number;
  };
};

type StringEnumFilter<TAttribute extends string> = {
  attribute: TAttribute;
  type: "enum";
  attributes: {
    values: TAttribute extends keyof Product ? Product[TAttribute][] : never;
  };
};

export type Filter<TProduct extends Product> =
  | StringEnumFilter<Exclude<keyof TProduct, string | symbol | number>>
  | NumberFilter;

export const useNumberFilter = <T extends NumberFilter>(
  filter: SetOptional<T, "type">
) => {
  const [filterValue, setFilter] = useState({
    type: "number" as const,
    ...filter.attributes,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilterValue = (value: Omit<typeof filterValue, "type">) => {
    setFilter({ type: "number", ...value });

    const params = new URLSearchParams(
      // Not sure why this doesn't work, it's straight out of next.js documentation
      searchParams as unknown as URLSearchParams
    );

    params.set(filter.attribute + ".min", value.min.toString());
    params.set(filter.attribute + ".max", value.max.toString());

    router.replace(`${pathname}?${params.toString()}`);

    console.log(searchParams.entries(), pathname);
  };

  return [filterValue, setFilterValue] as const;
};

type Lol = StringEnumFilter<"manufacturer">;

export const useEnumFilter = <
  TFilter extends StringEnumFilter<TAttribute>,
  TAttribute extends keyof Product
>(
  filter: SetOptional<TFilter, "type">
) => {
  const [filterValue, setFilter] = useState({
    type: "stringEnum" as const,
    attributes: filter.attributes,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilterValue = (value: Omit<typeof filterValue, "type">) => {
    setFilter({ type: "stringEnum", ...value });

    const params = new URLSearchParams(
      // Not sure why this doesn't work, it's straight out of next.js documentation
      searchParams as unknown as URLSearchParams
    );

    params.set(filter.attribute + ".min", value.toString());

    router.replace(`${pathname}?${params.toString()}`);

    console.log(searchParams.entries(), pathname);
  };

  return [filterValue, setFilterValue] as const;
};
