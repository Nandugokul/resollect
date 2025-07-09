import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import * as React from "react";
import { DateTimePicker } from "./DateTimePicker";

function AddEditTaskForm() {
  const [taskName, setTaskName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState<Date | undefined>(undefined);
  const [submitted, setSubmitted] = React.useState(false);

  const taskNameError = submitted && !taskName ? "Task name is required" : "";
  const deadlineError = submitted && !deadline ? "Deadline is required" : "";
  const isFormValid = !!taskName && !!deadline;

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid) return;
    const data = {
      taskName,
      description,
      deadline: deadline ? deadline.toISOString() : undefined,
    };
    console.log(data);
  }

  function handleTaskNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
    if (submitted) setSubmitted(false);
  }

  function handleDeadlineChange(d: Date | undefined) {
    setDeadline(d);
    if (submitted) setSubmitted(false);
  }

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleAddTask}>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Task Name</label>
            <Input
              placeholder="Enter task name..."
              value={taskName}
              onChange={handleTaskNameChange}
              aria-invalid={!!taskNameError}
            />
            {taskNameError && (
              <span className="text-red-500 text-xs mt-1">{taskNameError}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Deadline</label>
            <DateTimePicker value={deadline} onChange={handleDeadlineChange} />
            {deadlineError && (
              <span className="text-red-500 text-xs mt-1">{deadlineError}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Task</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddEditTaskForm;
