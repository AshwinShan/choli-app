import { JSX } from "react";
import { Company } from "./company";

interface Filter {
  map(arg0: (item: Company | string) => JSX.Element): import("react").ReactNode;
  company: Company[];
  location: string[];
  employmentType: string[];
}

interface Options {
  name: string;
  key: string;
  isObject?: boolean;
  option?: {
    label: string;
    value: string;
  };
}

export type { Filter, Options };
