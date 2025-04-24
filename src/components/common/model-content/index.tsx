import { createTask, fetchAllUserData, Task, updateTask } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
interface ProtectedData {
  _id: string;
  username: string;
  role: string;
}
interface ModelContentProps {
    onClose: () => void; // Define the type of the onClose prop
    data?: Task | null; // Updated type for data
  }
  
  interface UpdateTaskPayload {
    title: string;
    description: string;
    status: string;
    assignedTo: string;
  }
  
  const ModelContent: React.FC<ModelContentProps> = ({ onClose , data }) =>{
  const [title, setTitle] = useState<string>("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [description, setDescription] = useState<string>("");
  const queryClient = useQueryClient();
  const [assignedTo, setAssignedTo] = useState<string>("");
  const { data : userdata, isLoading } = useQuery<ProtectedData[] | null>(
    ["alluserData", token],
    () => fetchAllUserData(token ?? ""),
    {
      enabled: !!token,
    }
  );
  console.log(data);
   // Mutation for creating a task
   const createMutation = useMutation(createTask, { 
    onSuccess: () => { 
      toast.success("Task created successfully"); 
      resetForm();
      queryClient.invalidateQueries(["favorite-tasks", token]); 
      queryClient.invalidateQueries(["tasks", token]); 
      onClose(); 
    }, 
    onError: (error: any) => { 
      toast.error(error?.response?.data?.error || "An error occurred"); 
    }, 
  });
  const updateMutation = useMutation(
    ({ taskId, payload, token }: { taskId: string; payload: UpdateTaskPayload; token: string }) => updateTask(taskId, payload, token),
    {
      onSuccess: () => {
        toast.success("Task updated successfully");
        queryClient.invalidateQueries(["tasks", token]); // Invalidate queries to refresh data
        onClose(); // Close the modal
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.error || "An error occurred");
      },
    }
  );
  const currentUserRole = typeof window !== "undefined" ? localStorage.getItem("role") : '';
  // Populate form if data is provided
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setAssignedTo(data.assignedTo._id || ""); // Handle case where assignedTo might be null
    }
  }, [data]);
  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault();
  
    const taskData: UpdateTaskPayload = { 
      title, 
      description, 
      assignedTo, 
      status: data ? data.status : "pending", // Set status if updating, default to "pending" if creating
    };
  
    if (token) {
      if (data) {
        updateMutation.mutate({ taskId: data._id, payload: taskData, token }); // Call update mutation
      } else {
        createMutation.mutate({ taskData, token }); // Call create mutatio
      }
    } else { 
      toast.error("Token not found."); 
    } 
  };
  ;
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-white font-bold leading-6 text-[25px]">
      {data ? "Update Task" : "Create Task"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="flex flex-col">
          <label className="text-[16px] leading-5 font-semibold text-white ">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-[#1A1A19] border-b border-white  py-2 px-1 text-white  focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[16px] leading-5 font-semibold text-white ">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-[#1A1A19] border-b border-white h-[180px] py-2 px-1 text-white focus:outline-none resize-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[16px] leading-5 font-semibold text-white ">
            Assign To:
          </label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
            disabled={currentUserRole === 'user'} 
            className="bg-[#1A1A19] border-b border-white  py-2 px-1 text-white  focus:outline-none"
          >
            <option value="">Select a user</option>
            {userdata?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full text-center hover:bg-[#493628] py-2 bg-[#54473F] text-white font-bold text-[20px] rounded-md"
        >
             {data ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default ModelContent;
