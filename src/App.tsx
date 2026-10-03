import Header from './Components/Header'
import { useHashRoute } from './hooks/useHashRoute'
import AboutPage from './Pages/AboutPage'
import TasksPage from './Pages/TasksPage'

function App() {
  const route = useHashRoute()

  return (
    <div className="flex min-h-screen flex-col">
      <Header current={route} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {route === 'about' ? <AboutPage /> : <TasksPage />}
      </main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Görev Defteri · Veriler yalnızca bu tarayıcıda saklanır
      </footer>
    </div>
  )
}

export default App
