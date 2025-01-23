import { createStore } from "solid-js/store";
import { ID, Role, Permission } from "appwrite";
import { authState } from "./authStore";
import { load } from '@tauri-apps/plugin-store';

const [taskStore, setTaskStore] = createStore<TaskStore>({
    tasks: [],
    lastUpdated: new Date(),
    loading: false,
    localStore: null,
});
const workspace = "workspace1";

const initLocalStore = async () => {
    try {
        // TODO: filename should mirror the workspace
        const localStore = await load(`${workspace}/store.json`, { autoSave: false });
        setTaskStore("localStore", localStore);
        const localTasks: Promise<Task | undefined> = localStore.get("tasks");
        return localTasks;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to load local store");
    }
}

initLocalStore().then((localTasks) => {
    if (localTasks) {
        setTaskStore("tasks", localTasks);
    }
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
            $id: doc.$id,
            taskid: doc.taskid,
            title: doc.title,
            description: doc.description,
            status: doc.completed,
            labels: doc.labels,
            priority: doc.priority,
            startDate: doc.startDate,
            dueDate: doc.dueDate,
            assignedTo: doc.assignedTo,
            createdBy: doc.createdBy,
            deleted: doc.deleted,
            deletedAt: doc.deletedAt,
            deletedOnPlatform: doc.deletedOnPlatform,
        }));
        setTaskStore("tasks", tasks);
    }, (error) => {
        console.log(error);
    });
};

const addTask = async (task: Task) => {
    if (taskStore.localStore === null) {
        console.error("Local store not initialized");
        return;
    }

    // handle logic for unique ID
    // TODO: handle offline mode & sync
    if (!task.$id) {
        task.$id = ID.unique();
    }

    // set locally first
    try {
        await taskStore.localStore.set("tasks", [...taskStore.tasks, task]);
    } catch (error) {
        console.log(error);
    }

    // check if authState.user is null. Unauthorized user should not be able to add tasks to db
    if (authState.isAuthenticated) {
        // need to handle id error
        // const response = await authState.databases.createDocument(
        await authState.databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_WORKSPACE_1_TASKS_COLLECTION_ID,
            task.$id,
            task,
            [
                Permission.read(Role.user(authState.user.$id)),    // Only this user can read
                Permission.update(Role.user(authState.user.$id)),  // Only this user can update
                Permission.delete(Role.user(authState.user.$id))   // Only this user can delete
            ]
        );
    }
    setTaskStore("tasks", (tasks) => [...tasks, task]);
};

const updateTask = async (id: string, completed: boolean) => {
    const response = await authState.databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
        id, {
        completed,
    });
    const updatedTask: Task = {
        $id: response.$id,
        taskid: response.taskid,
        title: response.title,
        description: response.description,
        status: response.completed,
        labels: response.labels,
        priority: response.priority,
        startDate: response.startDate,
        dueDate: response.dueDate,
        assignedTo: response.assignedTo,
        createdBy: response.createdBy,
        deleted: response.deleted,
        deletedAt: response.deletedAt,
        deletedOnPlatform: response.deletedOnPlatform

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