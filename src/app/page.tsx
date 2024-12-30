"use client";

import React, { useState } from "react";
import { useTaskFetcher } from "@/hooks/useTaskFetcher";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useLazyLoader } from "@/hooks/useLazyLoader";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { TaskList } from "@/components/TaskList/TaskList";
import styles from "./page.module.css";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const { tasks, hasMore, loading, loadMoreTasks } = useTaskFetcher(debouncedSearch);

  const observerRef = useLazyLoader({
    hasMore,
    loading,
    onLoadMore: loadMoreTasks,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management App</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.taskListWrapper}>
        <TaskList tasks={tasks} />
        {loading && <p className={styles.loading}>Loading tasks...</p>}
        {!hasMore && !loading && <p className={styles.noMoreTasks}>No more tasks to load.</p>}
        <div ref={observerRef} className={styles.loadMoreTrigger} />
      </div>
    </div>
  );
}
