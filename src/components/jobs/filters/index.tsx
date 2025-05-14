"use client";
import { Filter } from "@/types/filter";
import MultiFilterDropDown from "./dropdown";

export default function Filters({
  filter,
  setSelectedFilters,
  selectedFilters,
}: {
  filter: Filter;
  selectedFilters: {
    company: string[];
    location: string[];
    employmentType: string[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      company: string[];
      location: string[];
      employmentType: string[];
    }>
  >;
}) {
  const filterCategories: { name: string; key: keyof Filter }[] = [
    { name: "Company Name", key: "company" },
    { name: "Location", key: "location" },
    { name: "Employment Type", key: "employmentType" },
  ];

  const handleFilterChange = (
    categoryKey: keyof Filter,
    selectedValues: string[]
  ) => {
    setSelectedFilters((prev) => ({ ...prev, [categoryKey]: selectedValues }));
  };

  const handleFilterData = (key: keyof Filter) => {
    const rawData = filter[key];

    if (!Array.isArray(rawData)) return [];

    const uniqueValues = Array.from(
      new Set(
        rawData.map((item) =>
          typeof item === "object" && "name" in item ? item.name : item
        )
      )
    );

    return uniqueValues;
  };

  return (
    <div className="flex flex-wrap mx-auto justify-around align-middle my-10 p-3 bg-white border-1 border-slate-200 w-3/4">
      {filterCategories.map((category) => (
        <div key={category.key} className="flex flex-col mb-2">
          <h2 className="text-lg font-semibold font-sans text-slate-600 mb-2">
            {category.name}
          </h2>
          <MultiFilterDropDown
            options={handleFilterData(category.key)}
            value={selectedFilters[category.key as keyof typeof selectedFilters]}
            categoryName={category.name}
            onFilterChange={(values) =>
              handleFilterChange(category.key, values)
            }
          />
        </div>
      ))}
      <button
        onClick={() =>
          setSelectedFilters({ company: [], location: [], employmentType: [] })
        }
        className="text-sm text-blue-600 hover:underline mt-2 ml-4"
      >
        Clear Filters
      </button>
    </div>
  );
}