import React from "react";
import { Task } from "@/types/task";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskCard}>
          <h3 className={styles.taskTitle}>{task.name}</h3>
          <p className={styles.taskDescription}>{task.description}</p>
        </div>
      ))}
    </div>
  );
};
