import React from "react";
import { TaskData } from "../../pages/Project";
import { PriorityIconMap } from "../../pages/Project";
import { Droppable, Draggable } from "react-beautiful-dnd";

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
  return (
    <div className="grid grid-cols-3 h-full mt-4 gap-4 mx-6 rounded-md">
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        {/* <p>Priority: {task.priority}</p> */}
                        <p>Duration: {task.duration}</p>
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        <p>Duration: {task.duration}</p>
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="bg-white relative shadow-md rounded-md p-4 mb-4">
                        <p className="font-semibold">
                          Task Name: {task.taskName}
                        </p>
                        <p>Description: {task.description}</p>
                        <p>Duration: {task.duration}</p>
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
