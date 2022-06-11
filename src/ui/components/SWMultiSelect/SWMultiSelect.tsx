import * as React from "react";

type SWMultiSelectProps = {
  options: any[];
  selectedValues: any[];
  onSelect: Function;
  onRemove: Function;
  displayValue: string;
  placeholder: string;
};

const SWMultiSelect: React.FC<any> = (props: SWMultiSelectProps) => {
  const {
    options = [],
    selectedValues = [],
    onSelect,
    onRemove,
    displayValue,
  } = props;

  return (
    <div className="w-full p-2 py-3 border rounded-md border-gray-300">
      <div className="flex">
        {selectedValues &&
          selectedValues.length > 0 &&
          selectedValues.map((entity: any) => (
            <span className="bg-teal-500 py-1 px-2 mx-1 rounded-md text-white flex items-center justify-center">
              <span>{entity[displayValue]}</span>
              <span className="ml-2 rounded-full h-4 w-4 pb-3 px-3 flex items-center justify-center p-2 text-gray-600 font-semibold bg-white cursor-pointer">
                x
              </span>
            </span>
          ))}
      </div>
      <input type="text" value="am" />
    </div>
  );
};

export default SWMultiSelect;
