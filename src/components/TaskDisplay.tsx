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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import TaskDisplayGrid from "./TaskDisplayGrid";
import { type Task } from "../types/task";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import { toast } from "react-hot-toast";

function TaskDisplay() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("todoList").select("*");
    if (error) {
      toast.error("Failed to fetch tasks. Please try again later.");
      setTasks([]);
    } else {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="py-8">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <CardTitle className="text-3xl">My Tasks</CardTitle>
          <CardAction>
            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden sm:flex">
                    <Plus className="h-4 w-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AddEditTaskForm mode="add" />
                </DialogContent>
              </Dialog>
            </div>
          </CardAction>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 left-1/2 transform -translate-x-1/2 sm:hidden">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <AddEditTaskForm mode="add" />
        </SheetContent>
      </Sheet>
      <TaskDisplayGrid tasks={tasks} />
    </>
  );
}

export default TaskDisplay;
