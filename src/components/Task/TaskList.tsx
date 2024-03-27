import React, { useState, useEffect } from "react";
import { TaskData } from "../../pages/Project";
import { PriorityIconMap } from "../../pages/Project";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SubTaskModal from "./subTaskModal";
import { ProjectDetails } from "../projectForm/ProjectCreationForm";
import { useParams } from "react-router-dom";

interface TaskListProps {
  taskData: TaskData[];
  progressData: TaskData[];
  completedData: TaskData[];
  priorityIconMap: PriorityIconMap;
  taskListRef: React.RefObject<HTMLDivElement>;
}

const TaskList: React.FC<TaskListProps> = ({
  taskData,
  progressData,
  completedData,
  priorityIconMap,
  taskListRef,
}) => {
  const { projectName } = useParams<{ projectName: string }>();
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isInProgressModalOpen, setIsInProgressModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const projectDetailsString = localStorage.getItem("projectDetails");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${selectedTask?.id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [selectedTask]);

  const handleAddComment = () => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    if (selectedTask) {
      localStorage.setItem(
        `comments_${selectedTask.id}`,
        JSON.stringify(updatedComments)
      );
    }

    setNewComment("");
  };

  let projectDetails: ProjectDetails | null = null;

  if (projectDetailsString) {
    projectDetails = JSON.parse(projectDetailsString);
  }

  const openTodoModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsTodoModalOpen(true);
  };

  const openInProgressModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsInProgressModalOpen(true);
  };

  const openDoneModal = (task: TaskData) => {
    setSelectedTask(task);
    setIsDoneModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsTodoModalOpen(false);
    setIsInProgressModalOpen(false);
    setIsDoneModalOpen(false);
  };
  return (
    <div className="grid grid-cols-3 h-screen mt-4 gap-4 mx-6 rounded-md">
      <Droppable droppableId="todo">
        {(provided) => (
          <div
            className="col-span-1"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className="bg-gray-100 py-4 px-6"
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                width: "100%",
                height: "100%",
              }}
              ref={taskListRef}
            >
              <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                To Do:
              </h2>
              {taskData.map((task, index) => (
                <div key={index}>
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}-todo`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => openTodoModal(task)}
                      >
                        <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                          <p className="font-semibold text-blue-900">
                            Task Name: {task.taskName}
                          </p>
                          <p>Description: {task.description}</p>
                          {/* <p>Priority: {task.priority}</p> */}
                          <p>Duration: {task.duration} days</p>
                          <div className="absolute bottom-1 right-2">
                            {
                              priorityIconMap[
                                task.priority as keyof PriorityIconMap
                              ]
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  <SubTaskModal
                    key={`${task.id}-todo-modal`}
                    isOpen={isTodoModalOpen}
                    onClose={closeModal}
                  >
                    <div
                      className={`fixed z-10 inset-0 overflow-y-auto ${
                        isTodoModalOpen ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                          <div
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                            style={{ maxHeight: "100vh" }}
                          >
                            {/* Left side */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h1 className="text-xl font-bold text-blue-900">
                                  {selectedTask?.taskName}
                                </h1>
                                <p className="text-sm text-gray-800">
                                  {selectedTask?.description}
                                </p>
                                <p className="text-sm text-blue-900 mt-4">
                                  Activity
                                </p>

                                {/* Comment section */}
                                <div className="mt-4">
                                  <h3 className="text-lg text-blue-900 font-bold text-gray-800">
                                    Comments
                                  </h3>
                                  {/* Render comments here */}
                                  <div
                                    className="mt-2"
                                    style={{
                                      maxHeight: "calc(80vh - 250px)",
                                      overflowY: "auto",
                                    }}
                                  >
                                    {comments.map((comment, index) => (
                                      <div
                                        key={index}
                                        className="bg-gray-100 rounded-md p-3 mb-2 flex items-center justify-between"
                                      >
                                        <p className="text-gray-700">
                                          {comment}
                                        </p>
                                        <button
                                          className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
                                          onClick={() =>
                                            handleDeleteComment(index)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Add an input box for new comments */}
                                  <div className="mt-4">
                                    <input
                                      type="text"
                                      className="border border-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                                      placeholder="Add a comment..."
                                      value={newComment}
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          handleAddComment();
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={handleAddComment}
                                      className="mt-2 bg-blue-900 hover:bg-gray-100 text-gray-100 hover:text-blue-900 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                      Add Comment
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Right side */}
                              <div>
                                <h2 className="text-lg font-bold text-blue-900">
                                  Details
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                  Reporter: {projectDetails?.projectOwner}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Assignee: {selectedTask?.assignee}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Priority: {selectedTask?.priority}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Parent: {projectName}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={closeModal}
                              className="w-full inline-flex justify-center rounded-md bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 border border-gray-100 border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SubTaskModal>
                </div>
              ))}

              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="inProgress">
        {(provided) => (
          <div
            className="col-span-1"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className="bg-gray-100 py-4 px-6"
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                width: "100%",
                height: "100%",
              }}
            >
              <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                In Progress:
              </h2>
              {progressData?.map((task, index) => (
                <div key={index}>
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}-inProgress`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => openInProgressModal(task)}
                      >
                        <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                          <p className="font-semibold">
                            Task Name: {task.taskName}
                          </p>
                          <p>Description: {task.description}</p>
                          <p>Duration: {task.duration} days</p>
                          <div className="absolute bottom-1 right-2">
                            {
                              priorityIconMap[
                                task.priority as keyof PriorityIconMap
                              ]
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  <SubTaskModal
                    key={`${task.id}-progress-modal`}
                    isOpen={isInProgressModalOpen}
                    onClose={closeModal}
                  >
                    <div
                      className={`fixed z-10 inset-0 overflow-y-auto ${
                        isInProgressModalOpen ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                          <div
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                            style={{ maxHeight: "100vh" }}
                          >
                            {/* Left side */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h1 className="text-xl font-bold text-blue-900">
                                  {selectedTask?.taskName}
                                </h1>
                                <p className="text-sm text-gray-800">
                                  {selectedTask?.description}
                                </p>
                                <p className="text-sm text-blue-900 mt-4">
                                  Activity
                                </p>

                                {/* Comment section */}
                                <div className="mt-4">
                                  <h3 className="text-lg text-blue-900 font-bold text-gray-800">
                                    Comments
                                  </h3>
                                  {/* Render comments here */}
                                  <div
                                    className="mt-2"
                                    style={{
                                      maxHeight: "calc(80vh - 250px)",
                                      overflowY: "auto",
                                    }}
                                  >
                                    {comments.map((comment, index) => (
                                      <div
                                        key={index}
                                        className="bg-gray-100 rounded-md p-3 mb-2 flex items-center justify-between"
                                      >
                                        <p className="text-gray-700">
                                          {comment}
                                        </p>
                                        <button
                                          className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
                                          onClick={() =>
                                            handleDeleteComment(index)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Add an input box for new comments */}
                                  <div className="mt-4">
                                    <input
                                      type="text"
                                      className="border border-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                                      placeholder="Add a comment..."
                                      value={newComment}
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          handleAddComment();
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={handleAddComment}
                                      className="mt-2 bg-blue-900 hover:bg-gray-100 text-gray-100 hover:text-blue-900 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                      Add Comment
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Right side */}
                              <div>
                                <h2 className="text-lg font-bold text-blue-900">
                                  Details
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                  Reporter: {projectDetails?.projectOwner}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Assignee: {selectedTask?.assignee}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Priority: {selectedTask?.priority}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Parent: {projectName}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={closeModal}
                              className="w-full inline-flex justify-center rounded-md bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 border border-gray-100 border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SubTaskModal>
                </div>
              ))}

              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="done">
        {(provided) => (
          <div
            className="col-span-1"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className="bg-gray-100 py-4 px-6"
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                width: "100%",
                height: "100%",
              }}
            >
              <h2 className="text-lg text-blue-900 font-semibold mb-4 border-b-2 border-gray-300 pb-2">
                Done:
              </h2>
              {completedData?.map((task, index) => (
                <div key={index}>
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}-done`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => openDoneModal(task)}
                      >
                        <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                          <p className="font-semibold">
                            Task Name: {task.taskName}
                          </p>
                          <p>Description: {task.description}</p>
                          <p>Duration: {task.duration} days</p>
                          <div className="absolute bottom-1 right-2">
                            {
                              priorityIconMap[
                                task.priority as keyof PriorityIconMap
                              ]
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  <SubTaskModal
                    key={`${task.id}-done-modal`}
                    isOpen={isDoneModalOpen}
                    onClose={closeModal}
                  >
                    <div
                      className={`fixed z-10 inset-0 overflow-y-auto ${
                        isDoneModalOpen ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                          <div
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                            style={{ maxHeight: "100vh" }}
                          >
                            {/* Left side */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h1 className="text-xl font-bold text-blue-900">
                                  {selectedTask?.taskName}
                                </h1>
                                <p className="text-sm text-gray-800">
                                  {selectedTask?.description}
                                </p>
                                <p className="text-sm text-blue-900 mt-4">
                                  Activity
                                </p>

                                {/* Comment section */}
                                <div className="mt-4">
                                  <h3 className="text-lg text-blue-900 font-bold text-gray-800">
                                    Comments
                                  </h3>
                                  {/* Render comments here */}
                                  <div
                                    className="mt-2"
                                    style={{
                                      maxHeight: "calc(80vh - 250px)",
                                      overflowY: "auto",
                                    }}
                                  >
                                    {comments.map((comment, index) => (
                                      <div
                                        key={index}
                                        className="bg-gray-100 rounded-md p-3 mb-2 flex items-center justify-between"
                                      >
                                        <p className="text-gray-700">
                                          {comment}
                                        </p>
                                        <button
                                          className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
                                          onClick={() =>
                                            handleDeleteComment(index)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Add an input box for new comments */}
                                  <div className="mt-4">
                                    <input
                                      type="text"
                                      className="border border-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                                      placeholder="Add a comment..."
                                      value={newComment}
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          handleAddComment();
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={handleAddComment}
                                      className="mt-2 bg-blue-900 hover:bg-gray-100 text-gray-100 hover:text-blue-900 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                      Add Comment
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Right side */}
                              <div>
                                <h2 className="text-lg font-bold text-blue-900">
                                  Details
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                  Reporter: {projectDetails?.projectOwner}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Assignee: {selectedTask?.assignee}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Priority: {selectedTask?.priority}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Parent: {projectName}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={closeModal}
                              className="w-full inline-flex justify-center rounded-md bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 border border-gray-100 border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SubTaskModal>
                </div>
              ))}

              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
