import Navbar from "../ui/Navbar";
import TaskDisplay from "./TaskDisplay";

function Todo() {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg m-auto px-4 md:px-8">
        <TaskDisplay />
      </div>
    </div>
  );
}

export default Todo;
