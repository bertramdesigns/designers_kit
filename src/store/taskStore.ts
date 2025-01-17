import { createStore } from "solid-js/store";
import { ID, Role, Permission } from "appwrite";
import { authState } from "./authStore";

const [taskStore, setTaskStore] = createStore<TaskState>({
    tasks: [],
});

const fetchTasks = async () => {
    let tasks: Task[] = [];
    const promise = authState.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_WORKSPACE_1_TASKS_COLLECTION_ID,
        // TODO: query for workspace
        // [ Query.equal("workspace", workspace) ]
    );

    promise.then((response) => {
        tasks = response.documents.map((doc: any) => ({
            taskid: doc.$id,
            title: doc.title,
            status: doc.completed,
            labels: doc.labels,
            priority: doc.priority,
            startDate: doc.startDate,
            dueDate: doc.dueDate,
            assignedTo: doc.assignedTo,
        }));
        setTaskStore("tasks", tasks);
    }, (error) => {
        console.log(error);
    });
    // const tasks = response.documents.map((doc: any) => ({
    //     id: doc.$id,
    //     title: doc.title,
    //     status: doc.completed,
    //     label: doc.label,
    //     priority: doc.priority,
    // }));
};

const addTask = async (task: Task) => {
    // check if authState.user is null. Unauthorized user should not be able to add tasks
    if (!authState.user) {
        return;
    }

    const response = await authState.databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_WORKSPACE_1_TASKS_COLLECTION_ID,
        ID.unique(),
        task,
        [
            Permission.read(Role.user(authState.user.$id)),    // Only this user can read
            Permission.update(Role.user(authState.user.$id)),  // Only this user can update
            Permission.delete(Role.user(authState.user.$id))   // Only this user can delete
        ]
    );
    const newTask: Task = {
        taskid: response.taskid,
        title: response.title,
        status: response.completed,
        labels: response.labels,
        priority: response.priority,
        startDate: response.startDate,
        dueDate: response.dueDate,
        assignedTo: response.assignedTo,
    };
    setTaskStore("tasks", (tasks) => [...tasks, newTask]);
};

const updateTask = async (id: string, completed: boolean) => {
    const response = await authState.databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
        id, {
        completed,
    });
    const updatedTask: Task = {
        taskid: response.taskid,
        title: response.title,
        status: response.completed,
        labels: response.labels,
        priority: response.priority,
        startDate: response.startDate,
        dueDate: response.dueDate,
        assignedTo: response.assignedTo,

    };
    setTaskStore("tasks", (tasks) => tasks.map((task) => (task.taskid === id ? updatedTask : task)));
};

const deleteTask = async (id: string) => {
    await authState.databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
        id
    );
    setTaskStore("tasks", (tasks) => tasks.filter((task) => task.taskid !== id));
};

export { taskStore, fetchTasks, updateTask, deleteTask, addTask };