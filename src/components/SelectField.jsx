const SelectField = ({
  options = [],
  value = "",
  onChange,
  disabled = false,
  placeholder = "Please choose a topic",
  defaultValue = "",
  containerClassName = "",
  selectClassName = "",
  selectRef,
}) => {
  return (
    <div className={`lg:w-[20%] w-full ${containerClassName}`}>
      <select
        ref={selectRef}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        // defaultValue={defaultValue}
        className={`py-[10px] rounded-md px-3 pr-11 block w-full border-gray-200 border-[1px] shadow-sm rounded-r-md text-sm focus:z-10 focus:outline-[1px] focus:outline-sky-100 text-gray-800 ${selectClassName}`}
      >
        <option value="">{placeholder}</option>
        {options?.length > 0 &&
          options?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
