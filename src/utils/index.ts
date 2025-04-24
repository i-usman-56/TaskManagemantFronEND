// utils/api.ts
import axios from "./axios";

export interface User {
  _id: string;
  username: string;
}

export interface Task {
  _id: string; // Task ID
  title: string; // Task title
  description: string; // Task description
  assignedTo: User; // User object
  status: string; // Task status (e.g., "pending", "completed")
  createdAt: string; // Creation date
  updatedAt: string; // Last updated date
  __v: number; // Version key (optional)
  isFavorite: boolean;
}
interface UpdateTaskPayload {
  title: string;
  description: string;
  status: string;
  assignedTo: string;
}

interface taskCardentails {
  title: string;
  description: string;
  assignedTo: string
  status: string; // Use 'as const' for the status literal type
}
// utils/api.ts
export const createTask = async ({
  taskData,
  token,
}: {
  taskData: taskCardentails;
  token: string;
}) => {
  const response = await axios.post("/tasks", taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Assume the response returns task data
};

export const addTaskToFavorites = async (
  userId: string,
  taskId: string,
  token: string
) => {
  const response = await axios.post(
    "/favorites/favorites",
    {
      userId,
      taskId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Adjust based on your API's response structure
};
export const updateTask = async (taskId: string, payload: UpdateTaskPayload, token: string) => {
  const response = await axios.put(
    `/tasks/${taskId}`,
    payload, // Pass the payload with only necessary fields
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Adjust based on your API's response structure
};
export const updateTaskStatus = async (task: Task, token: string) => {
  const response = await axios.put(
    `/tasks/${task._id}`,
    { status: task.status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Adjust based on your API's response structure
};

export const fetchProtectedData = async (token: string) => {
  const response = await axios.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Adjust based on your response structure
};

export const fetchAllUserData = async (token: string) => {
  const response = await axios.get("/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Adjust based on your response structure
};

export const fetchAllTasks = async (token: string): Promise<Task[]> => {
  const response = await axios.get("/tasks/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data; // Ensure this matches your API's response structure
};
export const fetchAllTasksofUser = async (
  userId: string,
  token: string
): Promise<Task[]> => {
  const response = await axios.get(`/tasks/tasks/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data; // Ensure this matches your API's response structure
};
export const fetchAllTasksImportant = async (
  token: string
): Promise<Task[]> => {
  const response = await axios.get("/favorites//all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data; // Ensure this matches your API's response structure
};
export const fetchAllTasksofUserImportant = async (
  userId: string,
  token: string
): Promise<Task[]> => {
  const response = await axios.get(`/favorites/favorites/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data; // Ensure this matches your API's response structure
};
export const deleteTask = async (taskId: string, token: string) => {
  const response = await axios.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Adjust based on your API's response structure
};
