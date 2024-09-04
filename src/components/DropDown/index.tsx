import React, { useState, useRef, useEffect } from "react";
import SearchImg from "../../images/SideBar/Search";
import { CustomDropdownProps } from "./props";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  defaultOptionId,
  setDefaultOptionId,
  displayProperty,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (optionId: string) => {
    setDefaultOptionId(optionId);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option[displayProperty].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <button
        onClick={handleToggleDropdown}
        className="relative w-full px-4 py-2 bg-white rounded-md shadow-md text-left text-fontColor font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {options.find((opt) => opt.id === defaultOptionId)?.[displayProperty] ||
          "Select option"}
        {/* Arrow icon */}
        <svg
          className={`absolute top-0 right-0 w-5 h-5 mt-3 mr-3 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-50 rounded-md shadow-lg border bg-white border-gray-300 max-h-60 overflow-y-auto">
          {/* Search input */}
          <div className="flex items-center mt-3 mr-2 ml-2 mb-2 rounded-lg bg-white relative text-fontColor">
            <input
              type="search"
              className="w-full pl-10 py-1 mt-1 ml-1 mb-2 rounded-md focus:outline-none bg-transparent shadow-inner text-fontColor"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchImg /> {/* Search icon */}
          </div>
          {/* Options list */}
          <ul className="bg-white">
            {filteredOptions.map((option) => (
              <>
                <li
                  key={option.id}
                  className="px-4 py-2 hover:bg-gray-3 cursor-pointer font-medium text-fontColor"
                  onClick={() => handleSelectOption(option.id)}
                >
                  {option[displayProperty]}
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
