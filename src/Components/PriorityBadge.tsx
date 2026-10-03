import { PRIORITY_LABELS, type Priority } from '../Interfaces/Task'

const STYLES: Record<Priority, string> = {
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  high: 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[priority]}`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
