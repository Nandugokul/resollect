import { Toaster } from "react-hot-toast";
import Todo from "./components/homepage/Todo";

function App() {
  return (
    <div>
      <Todo />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
