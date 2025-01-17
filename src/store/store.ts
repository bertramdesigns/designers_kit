import { authState, login, logout, register } from "./authStore";
import { taskStore, fetchTasks, addTask, updateTask, deleteTask } from "./taskStore";

export const store = {
    auth: {
        state: authState,
        login,
        logout,
        register,
    },
    tasks: {
        state: taskStore,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
    },
};