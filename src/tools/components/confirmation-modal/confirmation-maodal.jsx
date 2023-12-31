import React from "react";

const ConfirmationModal = ({
  handleCancel,
  handleConfirm,
  text = "Are you sure you want to proceed?",
  mainText = "Confirm",
  cancelText = "Cancel",
  confirmText = "Confirm",
  loading = false,
}) => {
  return (
    <div
      className="min-w-screen h-screen fixed left-0 top-0 animated fadeIn faster flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full animate-rise  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 flex items-center text-blue-900 mx-auto"
              fill="none"
              viewBox="0 0 25 25"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h2 className="text-xl font-bold py-4 ">{mainText}</h2>
            <p className="text-sm text-gray-500 px-8">{text}</p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={handleCancel}
              className="transition-all duration-300 ease-in-out mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="transition-all duration-300 ease-in-out bg-blue-900 mb-2 md:mb-0  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg "
            >
              <div className="flex">
                {confirmText}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
