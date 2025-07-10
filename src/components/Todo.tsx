import Navbar from "./Navbar";
import TaskDisplay from "./TaskDisplay";

function Todo() {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg m-auto">
        <TaskDisplay />
      </div>
    </div>
  );
}

export default Todo;
