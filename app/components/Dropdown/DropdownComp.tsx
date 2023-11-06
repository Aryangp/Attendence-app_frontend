import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  options: Option[];
    placeholder: string;
    formid: number;
    selectedOptions: Option[];
  setSelectedOptions: (selectedOptions: Option[]) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
    placeholder,
    formid,
    selectedOptions,
    setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const toggleOption = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  const isOptionSelected = (option: Option) => selectedOptions.includes(option);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative w-full bg-white rounded mt-3">
      <div
        className="cursor-pointer p-4 border border-gray-300 rounded"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <span
              key={option.value}
              className="mr-2 p-3  bg-gray-600 rounded text-white"
            >
              {option.label}
            </span>
          ))
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search options"
            className="p-2 border-b border-gray-300 w-full text-gray-600"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="p-2">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleOption(option)}
              >
                <span className="text-gray-700">{option.label}</span>
                {isOptionSelected(option) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300">
            <button
              className="px-4 py-2 text-blue-500 hover:underline"
              onClick={clearSelection}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
