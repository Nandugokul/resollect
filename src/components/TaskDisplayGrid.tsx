import SingleTaskComponent from "./SingleTaskComponent";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Task } from "../types/task";

interface TaskDisplayGridProps {
  tasks: Task[];
}

function TaskDisplayGrid({ tasks }: TaskDisplayGridProps) {
  const ongoing: Task[] = [];
  const success: Task[] = [];
  const failure: Task[] = [];

  const now = new Date();

  tasks.forEach((task) => {
    if (task.isCompleted) {
      success.push(task);
    } else if (now < new Date(task.deadline)) {
      ongoing.push(task);
    } else {
      failure.push(task);
    }
  });

  return (
    <>
      <div className="hidden md:grid grid-cols-3 gap-6 w-full">
        <div>
          <h2 className="text-xl font-bold mb-4 ">Ongoing</h2>
          <div className="flex flex-col gap-4">
            {ongoing.map((task, idx) => (
              <SingleTaskComponent key={task.id || idx} data={task} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 ">Success</h2>
          <div className="flex flex-col gap-4">
            {success.map((task, idx) => (
              <SingleTaskComponent key={task.id || idx} data={task} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 ">Failure</h2>
          <div className="flex flex-col gap-4">
            {failure.map((task, idx) => (
              <SingleTaskComponent key={task.id || idx} data={task} />
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden w-full">
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="ongoing" className="flex-1">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="success" className="flex-1">
              Success
            </TabsTrigger>
            <TabsTrigger value="failure" className="flex-1">
              Failure
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ongoing">
            <div className="flex flex-col gap-4">
              {ongoing.map((task, idx) => (
                <SingleTaskComponent key={task.id || idx} data={task} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="success">
            <div className="flex flex-col gap-4">
              {success.map((task, idx) => (
                <SingleTaskComponent key={task.id || idx} data={task} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="failure">
            <div className="flex flex-col gap-4">
              {failure.map((task, idx) => (
                <SingleTaskComponent key={task.id || idx} data={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default TaskDisplayGrid;
