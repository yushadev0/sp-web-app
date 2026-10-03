import type { Task } from '../Interfaces/Task'
import PriorityBadge from './PriorityBadge'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isOverdue(task: Task) {
  if (!task.dueDate || task.completed) return false
  const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, yerel saat
  return task.dueDate < today
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const overdue = isOverdue(task)

  return (
    <li className="group flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`"${task.title}" görevini ${task.completed ? 'tamamlanmadı' : 'tamamlandı'} olarak işaretle`}
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-medium break-words ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}
          >
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        {task.description && (
          <p className={`mt-1 text-sm break-words ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
            {task.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          {task.dueDate && (
            <span className={overdue ? 'font-medium text-rose-600' : ''}>
              {overdue ? 'Gecikti: ' : 'Son tarih: '}
              {formatDate(task.dueDate)}
            </span>
          )}
          <span>Eklendi: {formatDate(task.createdAt)}</span>
        </div>
      </div>
    </li>
  )
}
