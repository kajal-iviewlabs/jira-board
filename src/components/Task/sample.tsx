<div
  className={`fixed z-10 inset-0 overflow-y-auto ${
    isOpen ? "block" : "hidden"
  }`}
>
  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span
      className="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true"
    >
      &#8203;
    </span>

    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        {/* Left side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {selectedTask?.taskName}
            </h1>
            <h2 className="text-lg text-gray-800">
              {selectedTask?.description}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {selectedTask?.activity}
            </p>

            {/* Comment section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Comments</h3>
              {/* Render comments here */}
              {/* Example: */}
              {/* <p>Comment 1</p> */}
              {/* <p>Comment 2</p> */}
              {/* Add an input box for new comments */}
              <input
                type="text"
                className="mt-2 border border-gray-300 p-2 w-full"
                placeholder="Add a comment..."
              />
            </div>
          </div>

          {/* Right side */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">Details</h2>
            <p className="text-sm text-gray-600 mt-2">
              Reporter: {projectOwnerName}
            </p>
            <p className="text-sm text-gray-600">
              Assignee: {selectedTask?.assignee}
            </p>
            {/* Add other details here */}
            {/* Example: */}
            {/* <p>Priority: {selectedTask?.priority}</p> */}
            {/* <p>Parent: {selectedTask?.parent}</p> */}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={onClose}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>;
