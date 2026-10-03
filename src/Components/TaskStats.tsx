interface TaskStatsProps {
  total: number
  completed: number
}

export default function TaskStats({ total, completed }: TaskStatsProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="mt-6 border-t border-slate-100 pt-5">
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-700">İlerleme</span>
        <span className="text-slate-500">
          {completed} / {total} tamamlandı
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tamamlanma oranı"
      >
        <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
