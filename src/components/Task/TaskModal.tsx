import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface TaskData {
  id: string;
  taskName: string;
  description: string;
  priority: string;
  assignee: string;
  duration: string;
  status: string;
}

interface TaskModalProps {
  onSubmitTask: (newTaskData: TaskData) => void;
  onClose: () => void;
  invitedEmails: string[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  invitedEmails,
  onSubmitTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreateTask = () => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(assignee);

    // Validate duration format
    const isDurationValid = /^\d+$/.test(duration);

    if (!taskName || !description || !isEmailValid || !isDurationValid) {
      toast.error("Please fill in all fields correctly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const taskData = {
      id: Math.random().toString(36).substring(2, 11),
      taskName,
      description,
      priority,
      assignee,
      duration,
      status: "todo",
    };
    onSubmitTask(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-blue-900 mb-4">
                  Create Task
                </h3>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="task-name"
                      className="block text-sm font-medium text-blue-900"
                    >
                      Task Name
                    </label>
                    <input
                      type="text"
                      name="task-name"
                      id="task-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-blue-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-blue-900"
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 border-blue-900 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="assignee"
                      className="block text-sm font-medium text-blue-900"
                    >
                      Assignee
                    </label>
                    <input
                      type="email"
                      name="assignee"
                      id="assignee"
                      list="emails"
                      autoComplete="off"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                      placeholder="Enter assignee email"
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+" // Specify email pattern for validation
                    />
                    <datalist id="emails">
                      {invitedEmails.map((email, index) => (
                        <option key={index} value={email} />
                      ))}
                    </datalist>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-blue-900"
                    >
                      Duration [Days]
                    </label>
                    <input
                      type="number" // Set type to "number" for numeric input
                      name="duration"
                      id="duration"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center border-blue-900 hover:bg-blue-900 hover:text-gray-100 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-blue-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
            <button
              type="button"
              className="mt-3 w-full border-blue-900 inline-flex justify-center rounded-md hover:bg-blue-900 hover:text-gray-100 border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-900 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskModal;
