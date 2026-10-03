import TasksPage from './Pages/TasksPage'

function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-bold text-slate-900">Görev Defteri</h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <TasksPage />
      </main>
    </div>
  )
}

export default App
