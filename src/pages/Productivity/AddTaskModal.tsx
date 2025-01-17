import { Button } from "~/components/solidui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/solidui/dialog";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
} from "~/components/solidui/text-field";

import { createSignal } from "solid-js";
import { labels, priorities, statuses } from "./columns";
import { Combobox } from "~/components/dkui/combobox";

import { addTask } from "~/store/taskStore";
import { authState } from "~/store/authStore";

type AddTaskModalProps = {
  onTaskAdded: () => void;
};

export function AddTaskModal(props: AddTaskModalProps) {
  const [task, setTask] = createSignal<Task>({
    taskid: "",
    title: "",
    status: "",
    labels: [],
    priority: "",
    startDate: new Date(),
    dueDate: new Date(),
    assignedTo: [authState.user?.$id],
  });

  const handleSave = async () => {
    try {
      await addTask(task());
    } catch (error) {
      console.error(error);
    }

    console.log("Task added");
    props.onTaskAdded();
  };

  return (
    <Dialog>
      <div class="w-12">
        <DialogTrigger as={Button<"button">}>Add Task</DialogTrigger>
      </div>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new task.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <TextField class="grid grid-cols-4 items-center gap-4">
            <TextFieldLabel class="text-right">ID</TextFieldLabel>
            <TextFieldInput
              value={task().taskid}
              class="col-span-3"
              type="text"
              onInput={(e) =>
                setTask({ ...task(), taskid: e.currentTarget.value })
              }
            />
          </TextField>
          <TextField class="grid grid-cols-4 items-center gap-4">
            <TextFieldLabel class="text-right">
              Description of task
            </TextFieldLabel>
            <TextFieldTextArea
              value={task().title}
              class="col-span-3"
              onInput={(e) =>
                setTask({ ...task(), title: e.currentTarget.value })
              }
            />
          </TextField>
          <TextField class="grid grid-cols-4 items-center gap-4">
            <TextFieldLabel class="text-right">Status</TextFieldLabel>
            <Combobox
              listItems={statuses}
              class="col-span-3"
              onChange={(value) =>
                setTask({ ...task(), status: value ? value.value : "" })
              }
            />
          </TextField>
          <TextField class="grid grid-cols-4 items-center gap-4">
            <TextFieldLabel class="text-right">Label</TextFieldLabel>
            <Combobox
              listItems={labels}
              class="col-span-3"
              onChange={(value) =>
                setTask({ ...task(), labels: value ? [value.value] : [] })
              }
            />
          </TextField>
          <TextField class="grid grid-cols-4 items-center gap-4">
            <TextFieldLabel class="text-right">Priority</TextFieldLabel>
            <Combobox
              listItems={priorities}
              class="col-span-3"
              onChange={(value) =>
                setTask({ ...task(), priority: value ? value.value : "" })
              }
            />
          </TextField>
        </div>
        <DialogFooter>
          <DialogTrigger as={Button<"button">} onClick={handleSave}>
            Save Changes
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
