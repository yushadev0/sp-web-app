import type { PageKey } from '../Interfaces/Page'

interface HeaderProps {
  current: PageKey
}

const LINKS: { key: PageKey; label: string }[] = [
  { key: 'tasks', label: 'Görevler' },
  { key: 'about', label: 'Hakkında' },
]

export default function Header({ current }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <a href="#/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-4" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">Görev Defteri</span>
        </a>
        <nav className="flex gap-1">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.key === 'tasks' ? '#/' : `#/${link.key}`}
              aria-current={current === link.key ? 'page' : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                current === link.key ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
