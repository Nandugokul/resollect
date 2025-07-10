import * as React from "react";
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
import { DateTimePicker } from "./DateTimePicker";
import supabase from "@/utils/supabaseClient";
import { toast } from "react-hot-toast";

function AddEditTaskForm({ mode = "add" }: { mode?: "add" | "edit" }) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    deadline: undefined as Date | undefined,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const titleError = submitted && !form.title ? "Task name is required" : "";
  const deadlineError =
    submitted && !form.deadline ? "Deadline is required" : "";
  const isFormValid = !!form.title && !!form.deadline;

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, title: e.target.value }));
      if (submitted) setSubmitted(false);
    },
    [submitted]
  );

  const handleDescriptionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, description: e.target.value }));
    },
    []
  );

  const handleDeadlineChange = React.useCallback(
    (d: Date | undefined) => {
      setForm((prev) => ({ ...prev, deadline: d }));
      if (submitted) setSubmitted(false);
    },
    [submitted]
  );

  const handleAddTask = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (!isFormValid) return;
      setLoading(true);
      const now = new Date().toISOString();
      const payload = {
        title: form.title,
        description: form.description,
        deadline: form.deadline ? form.deadline.toISOString() : undefined,
        ...(mode === "add" ? { createdAt: now } : { updatedAt: now }),
      };
      const { error } = await supabase
        .from("todoList")
        .insert({ ...payload, isCompleted: false })
        .single();
      setLoading(false);
      if (error) {
        toast.error("Failed to add task. Please try again.");
        return;
      }
      toast.success("Task added successfully!");
      setForm({ title: "", description: "", deadline: undefined });
      setSubmitted(false);
    },
    [form, isFormValid, mode]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleAddTask}>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Task Name</label>
            <Input
              placeholder="Enter task name..."
              value={form.title}
              onChange={handleInputChange}
              aria-invalid={!!titleError}
              disabled={loading}
            />
            {titleError && (
              <span className="text-red-500 text-xs mt-1">{titleError}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Enter description..."
              value={form.description}
              onChange={handleDescriptionChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Deadline</label>
            <DateTimePicker
              value={form.deadline}
              onChange={handleDeadlineChange}
            />
            {deadlineError && (
              <span className="text-red-500 text-xs mt-1">{deadlineError}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddEditTaskForm;
