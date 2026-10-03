import type { SortOption, StatusFilter } from '../Interfaces/Task'

interface TaskFiltersProps {
  status: StatusFilter
  onStatusChange: (status: StatusFilter) => void
  search: string
  onSearchChange: (search: string) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  counts: Record<StatusFilter, number>
}

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Tamamlanan' },
]

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'En yeni',
  oldest: 'En eski',
  priority: 'Önceliğe göre',
  dueDate: 'Son tarihe göre',
}

export default function TaskFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  counts,
}: TaskFiltersProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görevlerde ara"
            aria-label="Görevlerde ara"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sıralama"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div role="tablist" aria-label="Durum filtresi" className="inline-flex rounded-lg bg-slate-200/60 p-1">
        {STATUS_TABS.map((tab) => {
          const active = status === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusChange(tab.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
                {counts[tab.value]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
