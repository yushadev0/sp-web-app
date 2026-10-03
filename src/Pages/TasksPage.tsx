import TaskForm from '../Components/TaskForm'
import TaskList from '../Components/TaskList'
import { useTasks } from '../hooks/useTasks'

export default function TasksPage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks()

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Yeni görev</h2>
        <TaskForm onSubmit={addTask} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Görevler</h2>
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          emptyMessage="Henüz görev yok. Formdan ilk görevinizi ekleyin."
        />
      </section>
    </div>
  )
}
