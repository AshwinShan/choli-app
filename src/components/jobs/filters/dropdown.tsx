"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type MultiFilterDropDownProps = {
  categoryName: string;
  options: string[];
  value: string[];
  onFilterChange: (selectedValues: string[]) => void;
};

export default function MultiFilterDropDown({
  categoryName,
  options,
  value,
  onFilterChange,
}: MultiFilterDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (optionValue: string) => {
    const updatedValues = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];

    onFilterChange(updatedValues);
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
    value.length > 0 ? value.join(", ") : categoryName;

  return (
    <div className="w-full max-w-md mx-auto relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-[250px] flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="truncate max-w-[200px]">{displayText}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-white border rounded-md shadow-md max-h-64 overflow-y-auto space-y-2 absolute z-10 w-full">
          {options.map((item, index) => (
            <label
              key={`${item}-${index}`}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                value={item}
                checked={value.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="truncate">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}