import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
} from "~/components/dkui/table";
import { TextField, TextFieldInput } from "~/components/solidui/text-field";
import { Button } from "~/components/solidui/button";
import { FaSolidPlus } from "solid-icons/fa";
import { For, createSignal } from "solid-js";

const tasks: TaskList = [
  {
    taskDescription: "INV001",
    status: "Paid",
    timeSpent: "$250.00",
  },
  {
    taskDescription: "INV002",
    status: "Pending",
    timeSpent: "$150.00",
  },
  {
    taskDescription: "INV003",
    status: "Unpaid",
    timeSpent: "$350.00",
  },
];
interface TaskItem {
  taskDescription: string;
  status: string;
  timeSpent: string;
}

type TaskList = TaskItem[];

const TimeTracker = () => {
  const [invoiceValue, setInvoiceValue] = createSignal("INV001");

  //   const addTask = () => {
  //     tasks.push({
  //       taskDescription: "INV004",
  //       status: "Unpaid",
  //       timeSpent: "$400.00",
  //     });
  //   };

  return (
    <Table>
      <TableCaption>A list of tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Time Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={tasks}>
          {/* {(task, i) => ( */}
          {(task) => (
            <TableRow>
              <TableCell class="font-medium">
                <TextField
                  value={invoiceValue()}
                  onFocusOut={() => console.log("out")}
                  onChange={setInvoiceValue}
                >
                  <TextFieldInput />
                </TextField>
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell class="text-right">{task.timeSpent}</TableCell>
            </TableRow>
          )}
        </For>
        <TableRow hover={false}>
          <Button variant="outline" onClick={() => console.log("click!")}>
            <FaSolidPlus />
          </Button>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default TimeTracker;
