import React from "react";

const BackPage = () => {
  const handleHome = () => {
    window.history.back(); // This will go back to the previous page in the browser history.
  };
  return (
    <div>
      <div>
        <button
          className="bg-black px-3 py-2 text-white hover:bg-gray-900 rounded-md"
          onClick={handleHome}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default BackPage;
