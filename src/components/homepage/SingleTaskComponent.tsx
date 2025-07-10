import { Card, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import AddEditTaskForm from "./AddEditTaskForm";
import React from "react";
import type { Task } from "@/types/task";
import { getDueParts } from "../../lib/utils";
import supabase from "@/lib/helper/supabaseClient";
import { toast } from "react-hot-toast";

function TaskCardContent({
  onCardClick,
  onMarkDone,
  data,
}: {
  onCardClick: () => void;
  onMarkDone: (e: React.MouseEvent, data: Task) => void;
  data: Task;
}) {
  const { label, value, isOverdue } = getDueParts(data.deadline);
  return (
    <Card className="p-3 gap-4">
      <div
        className="flex flex-col gap-2 cursor-pointer"
        onClick={onCardClick}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <CardTitle>{data?.title}</CardTitle>
          <div className="font-light text-[14px]">
            {data.isCompleted ? (
              <span className="text-green-500">Completed</span>
            ) : (
              <>
                <span className="text-gray-500">{label}</span>
                <span
                  className={`ml-1 ${
                    isOverdue ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {value}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="text-[14px] text-gray-500">{data?.description}</div>
      </div>
      {!data.isCompleted && (
        <button
          onClick={(e) => onMarkDone(e, data)}
          className="border-t border-gray-300 p-2"
        >
          Mark as done
        </button>
      )}
    </Card>
  );
}

function SingleTaskComponent({ data }: { data: Task }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSheet, setOpenSheet] = React.useState(false);

  const handleDialogCardClick = () => setOpenDialog(true);
  const handleSheetCardClick = () => setOpenSheet(true);
  const handleMarkDone = async (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    const { error } = await supabase
      .from("todoList")
      .update({ isCompleted: true })
      .eq("id", task.id);
    if (error) {
      toast.error("Failed to mark as done: " + error.message);
    } else {
      toast.success("Task marked as done successfully!");
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="hidden sm:block">
            <TaskCardContent
              onCardClick={handleDialogCardClick}
              onMarkDone={handleMarkDone}
              data={data}
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="sr-only">Edit Task</DialogTitle>
          <AddEditTaskForm data={data} setOpen={setOpenDialog} />
        </DialogContent>
      </Dialog>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <div className="sm:hidden">
            <TaskCardContent
              onCardClick={handleSheetCardClick}
              onMarkDone={handleMarkDone}
              data={data}
            />
          </div>
        </SheetTrigger>
        <SheetContent side="bottom">
          <DialogTitle className="sr-only">Edit Task</DialogTitle>
          <AddEditTaskForm data={data} setOpen={setOpenSheet} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SingleTaskComponent;
