// import AddEditTaskForm from "./components/AddEditTaskForm";
import { Toaster } from "react-hot-toast";
import Todo from "./components/Todo";

function App() {
  return (
    <div>
      <Todo />
      {/* <AddEditTaskForm /> */}
      <Toaster />
    </div>
  );
}

export default App;
