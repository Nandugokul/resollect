import { CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import AddEditTaskForm from "./AddEditTaskForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { type Task } from "../../types/task";
import { useEffect, useState } from "react";
import supabase from "@/lib/helper/supabaseClient";
import { toast } from "react-hot-toast";
import TaskDisplayGrid from "./TaskDisplayGrid";
import { initiallySetTasks } from "@/store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const SORT_OPTIONS = [
  { value: "deadline-asc", label: "Due Date (Earliest)" },
  { value: "deadline-desc", label: "Due Date (Latest)" },
  { value: "title-asc", label: "(A-Z)" },
  { value: "title-desc", label: "(Z-A)" },
  { value: "none", label: "None" },
];

function sortTasks(tasks: Task[], sortBy: string): Task[] {
  switch (sortBy) {
    case "title-asc":
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return [...tasks].sort((a, b) => b.title.localeCompare(a.title));
    case "deadline-asc":
      return [...tasks].sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    case "deadline-desc":
      return [...tasks].sort(
        (a, b) =>
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      );
    case "none":
    default:
      return tasks;
  }
}

function TaskDisplay() {
  const [sortBy, setSortBy] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todoReducer);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("todoList").select("*");
    if (error) {
      toast.error("Failed to fetch tasks. Please try again later.");
      dispatch(initiallySetTasks([]));
    } else {
      dispatch(initiallySetTasks(data || []));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="py-8">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <CardTitle className="text-2xl md:text-3xl">My Tasks</CardTitle>
          <CardAction>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="hidden sm:flex">
                    <Plus className="h-4 w-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="sr-only"></DialogTitle>
                  <AddEditTaskForm setOpen={setOpenDialog} />
                </DialogContent>
              </Dialog>
            </div>
          </CardAction>
        </div>
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 left-1/2 transform -translate-x-1/2 sm:hidden z-50">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <AddEditTaskForm setOpen={setOpenSheet} />
        </SheetContent>
      </Sheet>
      <TaskDisplayGrid
        tasks={!sortBy || sortBy === "none" ? tasks : sortTasks(tasks, sortBy)}
        loading={loading}
      />
    </>
  );
}

export default TaskDisplay;
