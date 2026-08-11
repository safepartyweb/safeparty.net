import React from 'react';

const PopupModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">Welcome!</h2>
        <p className="mb-4">1st order, refer a friend or spend more than 500$ and get 10% of your order.</p>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
