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
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "@/store/todoSlice";
import { removeTask } from "@/store/todoSlice";
import { DialogDescription } from "@radix-ui/react-dialog";

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
  const dispatch = useDispatch();

  // Add isCompleted variable
  const isCompleted = !!data?.isCompleted;

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

  const handleChange = React.useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | { name: keyof typeof form; value: string | Date | undefined }
    ) => {
      const { name, value } = "target" in e ? e.target : e;
      setForm((prev) => ({ ...prev, [name]: value }));
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
      let error: string | null = null;
      let insertedTask = null;
      let prevTask = null;
      if (data?.id) {
        // Optimistically update the task in Redux
        prevTask = { ...data };
        const optimisticUpdate = {
          ...data,
          title: form.title,
          description: form.description,
          deadline: form.deadline ? form.deadline.toISOString() : "",
          updatedAt: now,
        };
        dispatch(updateTask({ id: data.id, task: optimisticUpdate }));
        setOpen?.(false);
        const res = await supabase
          .from("todoList")
          .update({
            title: form.title,
            description: form.description,
            deadline: form.deadline ? form.deadline.toISOString() : undefined,
            updatedAt: now,
          })
          .eq("id", data.id)
          .single();
        error = res.error ? res.error.message : null;
        if (error) {
          // Revert optimistic update
          dispatch(updateTask({ id: data.id, task: prevTask }));
        }
      } else {
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        const optimisticTask = {
          id: tempId,
          title: form.title,
          description: form.description,
          deadline: form.deadline ? form.deadline.toISOString() : "",
          isCompleted: false,
          createdAt: now,
          updatedAt: null,
        };
        dispatch(addTask(optimisticTask));
        setOpen?.(false);
        const res = await supabase
          .from("todoList")
          .insert({
            title: form.title,
            description: form.description,
            deadline: form.deadline ? form.deadline.toISOString() : undefined,
            isCompleted: false,
            createdAt: now,
          })
          .select()
          .single();
        error = res.error ? res.error.message : null;
        insertedTask = res.data;
        if (!error && insertedTask) {
          dispatch(updateTask({ id: tempId, task: insertedTask }));
        }
        if (error) {
          dispatch(removeTask(tempId));
        }
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
    },
    [form, isFormValid, setOpen, data, dispatch]
  );

  const handleDiscard = React.useCallback(() => {
    setForm({ title: "", description: "", deadline: undefined });
    setSubmitted(false);
  }, []);

  const handleDelete = async () => {
    if (!data?.id) return;
    // Optimistically remove the task from Redux
    const prevTask = { ...data };
    dispatch(removeTask(data.id));
    setOpen?.(false);
    const { error } = await supabase
      .from("todoList")
      .delete()
      .eq("id", data?.id);
    if (error) {
      dispatch(addTask(prevTask));
      toast.error("Failed to remove task : " + error.message);
    } else {
      toast.success("Task deleted successfully!");
    }
  };

  return (
    <Card className="border-0 shadow-none py-4">
      <CardHeader className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              {data?.id ? "Update Task" : "Create Task"}
            </CardTitle>
            <DialogDescription className="text-[10px] mt-2 text-gray-500">
              {` Fill out the form below to ${
                data?.id ? "update the" : "create a new"
              }  task.`}
            </DialogDescription>
          </div>
          {data?.id && (
            <Button
              onClick={handleDelete}
              type="button"
              variant="ghost"
              size="lg"
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
              name="title"
              placeholder="Enter task name..."
              value={form.title}
              onChange={handleChange}
              aria-invalid={!!titleError}
              disabled={loading || isCompleted}
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
              name="description"
              placeholder="Enter description..."
              value={form.description}
              onChange={handleChange}
              disabled={loading || isCompleted}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Deadline</label>
            <DateTimePicker
              value={form.deadline}
              onChange={(d) => handleChange({ name: "deadline", value: d })}
              disablePast={true}
              disabled={loading || isCompleted}
            />
            {deadlineError && (
              <span className="text-red-500 text-xs mt-1">{deadlineError}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4 mt-5">
          <DialogClose asChild>
            <Button
              size="lg"
              className="flex-1"
              variant={"secondary"}
              type="button"
              onClick={handleDiscard}
              disabled={loading || isCompleted}
            >
              Discard
            </Button>
          </DialogClose>
          <Button
            className="flex-1"
            size="lg"
            type="submit"
            disabled={loading || isCompleted}
          >
            {loading
              ? data?.id
                ? "Updating..."
                : "Adding..."
              : data?.id
              ? "Update Task"
              : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddEditTaskForm;
