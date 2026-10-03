import type { Task } from '../Interfaces/Task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  emptyMessage: string
}

export default function TaskList({ tasks, onToggle, emptyMessage }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 px-6 py-12 text-center">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  )
}
