import { authState, login, logout, register } from "./authStore";
import { todoState, fetchTodos, addTodo, updateTodo, deleteTodo } from "./todoStore";

export const store = {
    auth: {
        state: authState,
        login,
        logout,
        register,
    },
    todo: {
        state: todoState,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
    },
};