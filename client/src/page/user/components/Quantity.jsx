import React from "react";

const Quantity = ({ increment, decrement, count }) => {
  return (
    <div className="flex flex-col items-center justify-center p-0 border border-gray-200 rounded-sm w-fit bg-white">
      <div className="flex gap-3 items-center rounded-lg p-1 font-medium">
        <button
          onClick={decrement}
          className="flex text-lg items-center justify-center w-8 h-8 text-gray-500 rounded-none transition duration-200"
        >
          -
        </button>
        <span className="text-sm">{count}</span>
        <button
          onClick={increment}
          className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-none transition duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
