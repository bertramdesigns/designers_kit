import { authState, login, logout, register } from "./authStore";
import { taskState, fetchTasks, addTask, updateTask, deleteTask } from "./todoStore";

export const store = {
    auth: {
        state: authState,
        login,
        logout,
        register,
    },
    todo: {
        state: taskState,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
    },
};