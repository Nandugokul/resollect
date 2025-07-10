import type { Task } from "@/types/task";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Task[] = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initiallySetTasks: (_state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, task } = action.payload;
      console.log(id, task);
      const idx = state.findIndex((t) => t.id === id);
      if (idx !== -1) {
        console.log({ ...state[idx], ...task });
        state[idx] = { ...state[idx], ...task };
      }
    },
    removeTask: (state, action) => {
      const id = action.payload;
      return state.filter((t) => t.id !== id);
    },
  },
});

export default todoSlice.reducer;
export const { addTask, updateTask, initiallySetTasks, removeTask } =
  todoSlice.actions;
