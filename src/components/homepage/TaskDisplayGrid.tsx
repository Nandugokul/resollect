import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Task } from "@/types/task";
import { Skeleton } from "../ui/skeleton";
import SingleTaskComponent from "./SingleTaskComponent";

interface TaskDisplayGridProps {
  tasks: Task[];
  loading?: boolean;
}

function TaskDisplayGrid({ tasks, loading = false }: TaskDisplayGridProps) {
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

  const skeletonCount = 3;
  const skeletons = Array.from({ length: skeletonCount }, (_, i) => (
    <div
      key={i}
      className="p-3 gap-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col mb-4"
      style={{ minHeight: 96 }}
    >
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-5 w-1/3 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-2/3 mb-1 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <Skeleton className="h-8 w-full mt-3 rounded" />
    </div>
  ));

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-6 w-full pb-20">
        {!loading &&
        ongoing.length === 0 &&
        success.length === 0 &&
        failure.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16">
            <span className="text-2xl text-muted-foreground font-semibold">
              No data
            </span>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-xl mb-4 ">Ongoing</h2>
              <div className="flex flex-col gap-4 md:max-h-[80vh] md:overflow-y-scroll hide-scrollbar">
                {loading
                  ? skeletons
                  : ongoing.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl mb-4 ">Success</h2>
              <div className="flex flex-col gap-4 md:max-h-[80vh] md:overflow-y-scroll hide-scrollbar">
                {loading
                  ? skeletons
                  : success.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl mb-4 ">Failure</h2>
              <div className="flex flex-col gap-4 md:max-h-[80vh] md:overflow-y-scroll hide-scrollbar">
                {loading
                  ? skeletons
                  : failure.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Mobile View */}
      <div className="md:hidden w-full ">
        {!loading &&
        ongoing.length === 0 &&
        success.length === 0 &&
        failure.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-2xl text-muted-foreground font-semibold">
              No data
            </span>
          </div>
        ) : (
          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="w-full mb-4 py-6 sticky top-0 z-10 bg-background">
              <TabsTrigger value="ongoing" className="flex-1 py-5">
                Ongoing
              </TabsTrigger>
              <TabsTrigger value="success" className="flex-1 py-5">
                Success
              </TabsTrigger>
              <TabsTrigger value="failure" className="flex-1 py-5">
                Failure
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ongoing">
              <div className="flex flex-col gap-4">
                {loading
                  ? skeletons
                  : ongoing.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </TabsContent>
            <TabsContent value="success">
              <div className="flex flex-col gap-4">
                {loading
                  ? skeletons
                  : success.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </TabsContent>
            <TabsContent value="failure">
              <div className="flex flex-col gap-4">
                {loading
                  ? skeletons
                  : failure.map((task, idx) => (
                      <SingleTaskComponent key={task.id || idx} data={task} />
                    ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
}

export default TaskDisplayGrid;
