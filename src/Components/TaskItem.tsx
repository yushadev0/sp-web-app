import { useState } from 'react'
import type { Task, TaskInput } from '../Interfaces/Task'
import PriorityBadge from './PriorityBadge'
import TaskForm from './TaskForm'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, input: TaskInput) => void
  onDelete: (id: string) => void
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isOverdue(task: Task) {
  if (!task.dueDate || task.completed) return false
  const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, yerel saat
  return task.dueDate < today
}

const iconButton =
  'rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-600'

export default function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [mode, setMode] = useState<'view' | 'edit' | 'confirm-delete'>('view')
  const overdue = isOverdue(task)

  if (mode === 'edit') {
    return (
      <li className="rounded-xl border border-indigo-200 bg-white p-4 shadow-sm ring-2 ring-indigo-500/10">
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }}
          submitLabel="Kaydet"
          onSubmit={(input) => {
            onUpdate(task.id, input)
            setMode('view')
          }}
          onCancel={() => setMode('view')}
        />
      </li>
    )
  }

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

        {mode === 'confirm-delete' && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
            <span className="mr-auto">Bu görev kalıcı olarak silinsin mi?</span>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-500"
            >
              Sil
            </button>
            <button
              type="button"
              onClick={() => setMode('view')}
              className="rounded-md px-3 py-1 text-xs font-medium text-rose-800 transition hover:bg-rose-100"
            >
              Vazgeç
            </button>
          </div>
        )}
      </div>

      {mode === 'view' && (
        <div className="flex shrink-0 items-start gap-1 opacity-100 transition sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
          <button type="button" onClick={() => setMode('edit')} className={iconButton} aria-label="Düzenle" title="Düzenle">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMode('confirm-delete')}
            className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`}
            aria-label="Sil"
            title="Sil"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  )
}
