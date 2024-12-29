import { createStore } from "solid-js/store";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // project ID

const databases = new Databases(client);

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const [todoState, setTodoState] = createStore<TodoState>({
    todos: [],
});

const fetchTodos = async () => {
    const response = await databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID);
    const todos = response.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title,
        completed: doc.completed,
    }));
    setTodoState("todos", todos);
};

const addTodo = async (title: string) => {
    const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
            title,
            completed: false,
        }
    );
    const newTodo: Todo = {
        id: response.$id,
        title: response.title,
        completed: response.completed,
    };
    setTodoState("todos", [...todoState.todos, newTodo]);
};

const updateTodo = async (id: string, completed: boolean) => {
    const response = await databases.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, id, {
        completed,
    });
    const updatedTodo: Todo = {
        id: response.$id,
        title: response.title,
        completed: response.completed,
    };
    setTodoState("todos", (todos) => todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
};

const deleteTodo = async (id: string) => {
    await databases.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, id);
    setTodoState("todos", (todos) => todos.filter((todo) => todo.id !== id));
};

export { todoState, fetchTodos, addTodo, updateTodo, deleteTodo };