export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}
