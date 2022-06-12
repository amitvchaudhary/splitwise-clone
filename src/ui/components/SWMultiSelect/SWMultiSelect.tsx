import * as React from "react";

type SWMultiSelectProps = {
  options: any[];
  selectedValues: any[];
  onSelect: Function;
  onRemove: Function;
  displayValue: string;
  placeholder: string;
  identifier: any;
  className: string;
};

const SWMultiSelect: React.FC<any> = (props: SWMultiSelectProps) => {
  const {
    options = [],
    selectedValues = [],
    onSelect,
    onRemove,
    displayValue,
    placeholder,
    identifier = "id",
    className,
  } = props;

  const inputRef = React.useRef<any>(null);

  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [optionsMinusSelected, setOptionsMinusSelected] = React.useState([]);
  const [focus, setFocus] = React.useState(false);

  const getOptionsMinusSelectedValues = (options: any, selectedValues: any) => {
    const optionsMinusSelectedLocal: any = options.filter(
      (option: any) =>
        !selectedValues.some(
          (selectedValue: any) => selectedValue.id === option.id
        )
    );
    return optionsMinusSelectedLocal || [];
  };

  React.useEffect(() => {
    const optionsMinusSelectedLocal = getOptionsMinusSelectedValues(
      options,
      selectedValues
    );
    setOptionsMinusSelected(optionsMinusSelectedLocal);
  }, [options, selectedValues]);

  React.useEffect(() => {
    if (searchText && searchText.trim()) {
      const filteredOptionsMinusSelected: any = optionsMinusSelected.filter(
        (option: any) => option[displayValue]?.indexOf(searchText) !== -1
      );
      setFilteredOptions(filteredOptionsMinusSelected);
    } else {
      setFilteredOptions(optionsMinusSelected);
    }
  }, [searchText, optionsMinusSelected]);

  const handleSearchTextChange = (e: any) => {
    setSearchText(e.target.value);
  };

  // const setFocus = () => {
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }

  const handleFocus = () => {
    setShowOptions(true);
    setFocus(true);
  };

  const handleKeypress = (e: any) => {
    if (e.key === "Backspace") {
      if (!searchText) {
        if (selectedValues && selectedValues.length > 0) {
          handleRemoveOption(selectedValues[selectedValues.length - 1]);
        }
        setShowOptions(false);
      }
    }

    if (e.key === "Enter") {
      if (searchText) {
        if (filteredOptions && filteredOptions.length === 1) {
          handleSelectOption(filteredOptions[0]);
        }
      }
    }

    // setFocus();
  };

  const handleSelectOption = (option: any) => {
    setShowOptions(true);
    onSelect(option);
    setSearchText("");
  };

  const handleRemoveOption = (option: any) => {
    onRemove(option);
  };

  const handleOutsideClick = (e: any) => {
    setTimeout(() => {
      setShowOptions(false);
      setFocus(false);
    }, 150);
  };

  return (
    <div onBlur={handleOutsideClick}>
      <div
        className={`${
          focus ? "border border-teal-500 shadow-2xl shadow-teal-400" : "border border-gray-300"
        } w-full p-2 py-3  rounded-md  ${className}`}
      >
        <span className="inline-flex flex-wrap gap-y-2">
          {selectedValues &&
            selectedValues.length > 0 &&
            selectedValues.map((selectedValue: any) => (
              <span
                key={selectedValue[identifier]}
                className="bg-teal-500 py-1 px-2 mx-1 rounded-md text-white inline-flex items-center justify-center"
              >
                <span>{selectedValue[displayValue]}</span>
                <span
                  onClick={() => handleRemoveOption(selectedValue)}
                  className="ml-2 rounded-full h-4 w-4 pb-3 px-3 flex items-center justify-center p-2 text-gray-600 font-semibold bg-white cursor-pointer"
                >
                  x
                </span>
              </span>
            ))}
          <input
            ref={inputRef}
            placeholder={placeholder}
            type="text"
            onFocus={handleFocus}
            value={searchText}
            onChange={handleSearchTextChange}
            className="grow border-0 outline-0 cursor-text"
            onKeyDown={handleKeypress}
            autoComplete="off"
          />
        </span>
      </div>
      <div
        className={`${
          focus
            ? "border border-teal-500"
            : "border-l border-b border-r border-gray-300"
        } w-full max-h-56 overflow-y-auto bg-white   -mt-2 ${
          showOptions || (searchText && searchText.length > 0)
            ? "block"
            : "hidden"
        }`}
      >
        {filteredOptions && filteredOptions.length === 0 ? (
          <span className="p-2">No items</span>
        ) : (
          filteredOptions?.map((filteredOption: any) => (
            <div
              className="py-1 px-2 hover:bg-teal-500 hover:text-white cursor-pointer"
              key={filteredOption[identifier]}
              onClick={() => handleSelectOption(filteredOption)}
            >
              {filteredOption[displayValue]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SWMultiSelect;
