import { Task } from '@/types/task';

export const filterTasks = (tasks: Task[], search: string): Task[] => {
  return tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );
};
