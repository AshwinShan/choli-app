"use client";
import { Options } from "@/types/filter";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MultiFilterDropDown({
  options,
  filterData,
  categoryName,
  onFilterChange,
}: {
  categoryName: string;
  options: Options;
  filterData: string[];
  onFilterChange: (selectedValues: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (value: string) => {
    setSelectedValues((prevSelected) => {
      const updatedSelection = prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value) // Remove if already selected
        : [...prevSelected, value]; // Add new selection

      setTimeout(() => onFilterChange(updatedSelection), 0);
      return updatedSelection;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayText =
    selectedValues.length > 0 ? selectedValues.join(", ") : categoryName;

  return (
    <div className="w-full max-w-md mx-auto relative" ref={dropdownRef}>
      {/* Toggle Button with selected values */}
      <button
        onClick={toggleDropdown}
        className="w-[250px] flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="truncate max-w-[200px]">{displayText}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="mt-2 p-4 bg-white border rounded-md shadow-md max-h-64 overflow-y-auto space-y-2 absolute z-10 w-full">
          {filterData.map((item, index) => (
            <label
              key={`${item}-${index}`}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                value={item}
                checked={selectedValues.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="form-checkbox h-4 w-4 text-blue-600 "
              />
              <span className="truncate">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
