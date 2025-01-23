import { Store } from "@tauri-apps/plugin-store";
import type { ID } from "appwrite";

declare global {
    type TaskPriority = 'low' | 'medium' | 'high';

    type Task = {
        $id?: string; // Document ID
        taskid: string;
        title?: string;
        description?: string;
        status: string; // TaskStatus;
        labels?: Array<string>;
        priority?: TaskPriority;
        startDate?: Date; // ISO 8601 date string
        dueDate?: Date; // ISO 8601 date string
        assignedTo: Array<string>; // User ID
        createdBy: string; // User ID
        deleted?: boolean; // Soft delete for server sync
        deletedAt?: Date;
        deletedOnPlatform?: "web" | "mobile" | "desktop";
        // history: Array<TaskHistory>; // Linked (relationship) to History
    }

    /* TODO: Implement TaskHistory
    type TaskHistory = {
        taskid: string; // Task ID
        title?: string;
        description?: string;
        status: TaskStatus;
        labels?: Array<string>;
        priority?: TaskPriority;
        startDate?: Date; // ISO 8601 date string
        dueDate?: Date; // ISO 8601 date string
        assignedTo: Array<string>; // User ID
        $updatedBy: string; // User ID
        $updatedDate: Date; // ISO 8601 date string
    } 
    */

    interface TaskStore {
        tasks: Task[];
        lastUpdated: Date;
        loading: boolean;
        localStore: Store | null; // instance to store local data
    }
}
export { }
