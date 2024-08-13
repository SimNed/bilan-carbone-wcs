import { ReactNode } from "react";

export type ComparatorElement = {
  label: string | number;
  comparatedValues: {
    label: string | number;
    value: number;
    optionalNode?: ReactNode;
  }[];
};
