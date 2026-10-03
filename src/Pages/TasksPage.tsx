import { useMemo, useState } from 'react'
import TaskFilters from '../Components/TaskFilters'
import TaskForm from '../Components/TaskForm'
import TaskList from '../Components/TaskList'
import TaskStats from '../Components/TaskStats'
import { useTasks } from '../hooks/useTasks'
import type { Priority, SortOption, StatusFilter, Task } from '../Interfaces/Task'

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

const COMPARATORS: Record<SortOption, (a: Task, b: Task) => number> = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  priority: (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  // Son tarihi olmayan görevler listenin sonuna
  dueDate: (a, b) => (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31'),
}

const EMPTY_MESSAGES: Record<StatusFilter, string> = {
  all: 'Henüz görev yok. Formdan ilk görevinizi ekleyin.',
  active: 'Aktif görev kalmadı.',
  completed: 'Henüz tamamlanan görev yok.',
}

export default function TasksPage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } = useTasks()
  const [status, setStatus] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  const completedCount = tasks.filter((task) => task.completed).length
  const counts: Record<StatusFilter, number> = {
    all: tasks.length,
    active: tasks.length - completedCount,
    completed: completedCount,
  }

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr')
    return tasks
      .filter((task) => {
        if (status === 'active' && task.completed) return false
        if (status === 'completed' && !task.completed) return false
        if (!query) return true
        return `${task.title} ${task.description}`.toLocaleLowerCase('tr').includes(query)
      })
      .sort(COMPARATORS[sort])
  }, [tasks, status, search, sort])

  const emptyMessage = search.trim() ? `"${search.trim()}" ile eşleşen görev bulunamadı.` : EMPTY_MESSAGES[status]

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Yeni görev</h2>
        <TaskForm onSubmit={addTask} />
        <TaskStats total={tasks.length} completed={completedCount} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Görevler</h2>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              className="text-sm font-medium text-slate-500 transition hover:text-rose-600"
            >
              Tamamlananları temizle
            </button>
          )}
        </div>
        <TaskFilters
          status={status}
          onStatusChange={setStatus}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          counts={counts}
        />
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          emptyMessage={emptyMessage}
        />
      </section>
    </div>
  )
}
