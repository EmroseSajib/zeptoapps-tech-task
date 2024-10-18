import { FaSearch } from "react-icons/fa";

const InputField = ({
  placeholder = "Enter text",
  onChange,
  value,
  disabled = false,
  icon = <FaSearch size={25} color="blue" />,
  inputClassName = "",
  containerClassName = "",
  inputRef,
  defaultValue = defaultValue,
}) => {
  return (
    <div className={`w-[50%] ${containerClassName}`}>
      <div className="flex rounded-md border-2 border-gray-200 overflow-hidden w-full mx-auto font-[sans-serif]">
        <div className="flex items-center justify-center bg-slate-200 px-5 fill-black">
          {icon}
        </div>
        <input
          defaultValue={defaultValue}
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full outline-none bg-slate-100 text-gray-600 text-sm px-4 py-3 ${inputClassName}`}
        />
      </div>
    </div>
  );
};

export default InputField;
