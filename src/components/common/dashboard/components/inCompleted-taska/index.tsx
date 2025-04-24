import { addTaskToFavorites, deleteTask, fetchAllTasks, fetchAllTasksofUser, Task, updateTaskStatus } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaEdit, FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseCircleSharp } from 'react-icons/io5';
import ModelContent from '@/components/common/model-content';
const bounceTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};
export default function InCompletedTasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State to hold the selected task
    const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null; // Assuming you store userId in local storage

  const queryClient = useQueryClient();

  const fetchTasks = () => {
    if (role === "user" && userId) {
      return fetchAllTasksofUser(userId, token!);
    }
    return fetchAllTasks(token!);
  };

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[], Error>(["tasks", token], fetchTasks, {
    enabled: !!token, // Only run the query if token is available
  });
  const mutation = useMutation<void, unknown, { taskId: string; userID: string }>(
    ({ taskId, userID }) => addTaskToFavorites(userID, taskId, token!),
    {
      onSuccess: () => {
        toast.success("Task added to favorites!");
        queryClient.invalidateQueries(["favorite-tasks", token]);
        queryClient.invalidateQueries(["tasks", token]);
      },
      onError: (error) => {
        if (error.status === 400) {
          toast.error(error.response?.data?.message || "Error adding task to favorites.");
          return;
        }
        if (error.status === 403) {
          toast.error(
            error.response?.data?.error || "Error adding task to favorites."
          );
          return;
        }
        console.log(error);
      },
    }
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = (task: Task) => {
    setSelectedTask(task); // Set the selected task
    setIsModalOpen(true); // Open the modal
  };
  const statusMutation = useMutation(
    (task: Task) => updateTaskStatus(task, token!),
    {
      onSuccess: () => {
        toast.success("Task status updated!");
        queryClient.invalidateQueries(["tasks", token]);
        queryClient.invalidateQueries(["favorite-tasks", token]);
      },
      onError: (error) => {
        console.log(error)
        if (error.status === 400) {
          toast.error(
            error.response?.data?.message
          );
          return;
        }
        toast.error("Error updating task status.");
        console.error(error);
      },
    }
  );
  
  // Function to handle status update
  const handleStatusUpdate = (task: Task) => {
    const updatedTask = { ...task, status: task.status === "completed" ? "pending" : "completed" };
    statusMutation.mutate(updatedTask);
  };
  const handleAddToFavorites = (taskId: string, userID: string) => {
    mutation.mutate({ taskId, userID });
  };
  const deleteMutation = useMutation((taskId: string) => deleteTask(taskId, token!), {
    onSuccess: () => {
      // Invalidate and refetch the tasks
      queryClient.invalidateQueries(["tasks", token]);
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const handleDelete = (taskId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      deleteMutation.mutate(taskId);
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;
    // Filter for completed tasks
    const inCompletedTasks = tasks.filter(task => task.status === 'pending');
  return (
    <div  style={{height:"calc(100vh - 110px)"}} className=" mt-4 h-[748px] overflow-y-scroll custom-scrollbar">
    <div className="grid grid-cols-4 gap-4">
      {inCompletedTasks.length === 0 ? (
        <div className="col-span-4 text-center p-4">
        {localStorage.getItem("role") !== "admin" && (

          <h2 className="text-lg font-semibold text-[#444444]">You don't have any tasks.</h2>
        )}
          {/* Show "Add Task" button if the user is not an admin */}
          {localStorage.getItem("role") === "admin" && (
            <button    onClick={() => {
              setIsModalOpen(true);
            }} className="mt-4 bg-[#C70D3A] text-white font-semibold py-2 px-4 rounded">
              Add Task
            </button>
          )}
        </div>
      ) : (
        inCompletedTasks.map((task) => (
          <div
            key={task._id}
            className="space-y-4 h-[240px] rounded-sm p-3 bg-[#04293A] flex flex-col"
          >
            <h1 className="text-[20px] font-bold leading-6 text-[#040303]">
              {task.title}
            </h1>
            <p className="text-[16px] text-ellipsis line-clamp-6 h-[120px] leading-5 font-medium text-[#444444]">
              {task.description}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleStatusUpdate(task)}
                  disabled={task.status === "completed"}
                  className={`w-[50%] uppercase ${
                    task.status === "completed"
                      ? "bg-[#146541] cursor-not-allowed"
                      : "bg-[#C70D3A]"
                  } font-semibold rounded-sm py-1`}
                >
                  {task.status}
                </button>
              <div className="flex justify-between w-[50%] pl-4">
                <FaHeart  className={`w-[30px] ${task.isFavorite ? "text-red":"text-white"} h-[30px] cursor-pointer`} onClick={() => handleAddToFavorites(task._id,task.assignedTo._id)} />
                <FaEdit className="w-[30px] h-[30px] cursor-pointer"  onClick={() => openModal(task)} />
                <MdDelete className="w-[30px] h-[30px] cursor-pointer" onClick={() => handleDelete(task._id)} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    <div className="hidden lg:block">
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-[#1A1A19] shadow-md rounded-[6px] p-5 lg:max-w-4xl lg:h-[518px] xl:h-[500px] xl:max-w-[25rem] w-full z-50"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={bounceTransition}
                onClick={(e) => e.stopPropagation()} // Prevent closing on content click
              >
                <div
                  onClick={closeModal}
                  className="absolute right-0 z-50 lg:-top-12 xl:-top-[45px] w-[40px] h-[40px] rounded-[8px] bg-[#FFFFFF] bg-opacity-50 flex justify-center items-center cursor-pointer"
                >
                  <IoCloseCircleSharp />
                </div>
                {/* Modal Content Here */}
                <ModelContent onClose={closeModal} data={selectedTask} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  </div>
  )
}
