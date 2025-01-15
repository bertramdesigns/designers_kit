import { columns, priorities, statuses } from "./columns";
import { DataTable } from "~/components/dkui/dataTable/data-table";
import { AddTaskModal } from "./AddTaskModal";
import { createEffect, createSignal } from "solid-js";
import { fetchTasks, taskState } from "~/store/todoStore";

export default function Tasks() {
  const [refresh, setRefresh] = createSignal(false);

  createEffect(() => {
    fetchTasks();
  });

  createEffect(() => {
    if (refresh()) {
      fetchTasks();
      setRefresh(false);
    }
  });

  return (
    <>
      <div class="flex justify-between space-y-2">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Time Tracker</h2>
          <p class="text-muted-foreground">
            Here&apos;s a list of your tasks and their progress.
          </p>
        </div>
      </div>
      <AddTaskModal onTaskAdded={() => setRefresh(true)} />
      <DataTable
        data={taskState.tasks}
        columns={columns}
        priorities={priorities}
        statuses={statuses}
      />
    </>
  );
}
