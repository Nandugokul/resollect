import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { DateTimePicker } from "../ui/DateTimePicker";
import supabase from "@/lib/helper/supabaseClient";
import { toast } from "react-hot-toast";
import { DialogClose } from "../ui/dialog";
import { Trash } from "lucide-react";
import type { Task } from "@/types/task";

function AddEditTaskForm({
  data,
  setOpen,
}: {
  data?: Task;
  setOpen?: (open: boolean) => void;
}) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    deadline: undefined as Date | undefined,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (data && data.id) {
      setForm({
        title: data.title || "",
        description: data.description || "",
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      });
    }
  }, [data]);

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
        ...(data?.id ? { updatedAt: now } : { createdAt: now }),
      };
      let error: string | null = null;
      if (data?.id) {
        // Update existing task, do not include isCompleted
        const res = await supabase
          .from("todoList")
          .update(payload)
          .eq("id", data.id)
          .single();
        error = res.error ? res.error.message : null;
      } else {
        // Insert new task, include isCompleted: false
        const res = await supabase
          .from("todoList")
          .insert({ ...payload, isCompleted: false })
          .single();
        error = res.error ? res.error.message : null;
      }
      setLoading(false);
      if (error) {
        toast.error(
          data?.id
            ? "Failed to update task. Please try again."
            : "Failed to add task. Please try again."
        );
        return;
      }
      toast.success(
        data?.id ? "Task updated successfully!" : "Task added successfully!"
      );
      setForm({ title: "", description: "", deadline: undefined });
      setSubmitted(false);
      setOpen?.(false);
    },
    [form, isFormValid, setOpen, data]
  );

  const handleDiscard = React.useCallback(() => {
    setForm({ title: "", description: "", deadline: undefined });
    setSubmitted(false);
  }, []);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("todoList")
      .delete()
      .eq("id", data?.id);
    if (error) {
      toast.error("Failed to remove task : " + error.message);
    } else {
      toast.success("Task deleted successfully!");
      setOpen?.(false);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{data?.id ? "Update Task" : "Create Task"}</CardTitle>
          {data?.id && (
            <Button
              onClick={handleDelete}
              type="button"
              variant="ghost"
              size="icon"
              className="ml-2"
              disabled={loading}
              aria-label="Delete"
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
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
        <CardFooter className="flex items-center justify-between gap-4 mt-5">
          <DialogClose asChild>
            <Button
              className="flex-1"
              variant={"secondary"}
              type="button"
              onClick={handleDiscard}
              disabled={loading}
            >
              Discard
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="flex-1" type="submit" disabled={loading}>
              {loading
                ? data?.id
                  ? "Updating..."
                  : "Adding..."
                : data?.id
                ? "Update Task"
                : "Add Task"}
            </Button>
          </DialogClose>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddEditTaskForm;
