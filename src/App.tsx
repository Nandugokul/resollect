import { Toaster } from "react-hot-toast";
import Todo from "./components/homepage/Todo";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Todo />
      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
}

export default App;
