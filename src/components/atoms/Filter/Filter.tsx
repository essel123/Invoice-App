import React, { useState } from "react";
import Headline from "../Headline/Headline";
import "./filter.css";
import Icon from "../Icon/Icon";

interface FilterItem {
  title: string;
  value: string;
}

interface FilterProps {
  items: FilterItem[];
  onSelectionChange: (selectedValues: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ items, onSelectionChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    let newSelectedValues;
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(
        selectedValue => selectedValue !== value
      );
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    onSelectionChange(newSelectedValues);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <div className="filter-container">
      <div className="filter-select" onClick={toggleOptionsVisibility}>
        <Headline
          variant="h3"
          children={
            <span>
              Filter by status{" "}
              <Icon
                src={"../../../../public/assets/icon-arrow-down.svg"}
                alt={""}
              />
            </span>
          }
        />
      </div>
      {isOptionsVisible &&
        <div className="filter-options">
          {items.map(item =>
            <div key={item.value} className="filter-option">
              <input
                type="checkbox"
                value={item.value}
                checked={selectedValues.includes(item.value)}
                onChange={() => handleSelectionChange(item.value)}
              />
              <label>
                {item.title}
              </label>
            </div>
          )}
        </div>}
    </div>
  );
};

export default Filter;