import type { ID } from "appwrite";

declare global {
    type TaskStatus = 'open' | 'in-progress' | 'completed';
    type TaskPriority = 'low' | 'medium' | 'high';

    type Task = {
        taskid: string;
        title?: string;
        description?: string;
        status: Status;
        labels?: Array<string>;
        priority?: Priority;
        startDate?: Date; // ISO 8601 date string
        dueDate?: Date; // ISO 8601 date string
        assignedTo: Array<string>; // User ID
    }

    interface TaskState {
        tasks: Task[];
    }
}
export { }
