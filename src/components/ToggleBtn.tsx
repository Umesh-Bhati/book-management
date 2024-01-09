import React from "react";

interface IToggleBtn {
  lable: string;
  handleChange: (e: any) => void;
}

const ToggleBtn: React.FC<IToggleBtn> = ({ lable, handleChange }) => {
  return (
    <div className="flex  items-center">
      <h1 className="text-sm dark:text-white  text-nowrap font-bold mr-3">
        {lable}
      </h1>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="w-11  h-6 text-nowrap text-sm bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
    </div>
  );
};

export default ToggleBtn;
