import { useCallback } from 'react'
import type { Task, TaskInput } from '../Interfaces/Task'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'sp-web-app:tasks'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])

  const addTask = useCallback(
    (input: TaskInput) => {
      const now = new Date().toISOString()
      const task: Task = {
        ...input,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: now,
        updatedAt: now,
      }
      setTasks((prev) => [task, ...prev])
    },
    [setTasks],
  )

  const updateTask = useCallback(
    (id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...changes, updatedAt: new Date().toISOString() } : task,
        ),
      )
    },
    [setTasks],
  )

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
            : task,
        ),
      )
    },
    [setTasks],
  )

  const deleteTask = useCallback(
    (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id)),
    [setTasks],
  )

  const clearCompleted = useCallback(
    () => setTasks((prev) => prev.filter((task) => !task.completed)),
    [setTasks],
  )

  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted }
}
