import React from "react";

type TCheckbox = {
  value: string;
  id: string;
  isChecked: boolean;
  onChange?: (e: any) => void;
};
const Checkbox: React.FC<TCheckbox> = ({ value, id, onChange, isChecked }) => {
  return (
    <div
      role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
      onChange={onChange}
    >
      <label
        htmlFor={id}
        className="flex items-center w-full px-3 py-2 cursor-pointer"
      >
        <div className="grid mr-3 place-items-center">
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center p-0 rounded-full cursor-pointer"
              htmlFor="vertical-list-react"
            >
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <p className="block font-primary text-xl antialiased font-medium leading-relaxed text-black">
          {value}
        </p>
      </label>
    </div>
  );
};
export default Checkbox;
