import { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "@/types/task";

export const useTaskFetcher = (searchQuery: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data } = await axios.get("/api/tasks", {
        params: { page, limit: 20, search: searchQuery },
      });

      setTasks((prev) => (page === 1 ? data.tasks : [...prev, ...data.tasks]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTasks([]);
    setPage(1);
    setHasMore(true);
    fetchTasks();
  }, [searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const loadMoreTasks = () => {
    setPage((prev) => prev + 1);
  };

  return { tasks, hasMore, loading, loadMoreTasks };
};
