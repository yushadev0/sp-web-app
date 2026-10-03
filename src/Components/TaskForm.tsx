import { useId, useState, type FormEvent } from 'react'
import { PRIORITY_LABELS, type Priority, type TaskInput } from '../Interfaces/Task'

interface TaskFormProps {
  initialValues?: TaskInput
  submitLabel?: string
  onSubmit: (input: TaskInput) => void
  onCancel?: () => void
}

const EMPTY: TaskInput = { title: '', description: '', priority: 'medium', dueDate: null }

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'

export default function TaskForm({
  initialValues = EMPTY,
  submitLabel = 'Görev Ekle',
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskInput>(initialValues)
  const [error, setError] = useState('')
  const idPrefix = useId()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const title = values.title.trim()
    if (!title) {
      setError('Görev başlığı boş olamaz.')
      return
    }
    onSubmit({ ...values, title, description: values.description.trim() })
    setError('')
    if (!onCancel) setValues(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor={`${idPrefix}-title`} className="mb-1 block text-sm font-medium text-slate-700">
          Başlık
        </label>
        <input
          id={`${idPrefix}-title`}
          type="text"
          value={values.title}
          maxLength={120}
          placeholder="Örn. Proje raporunu tamamla"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className={inputClass}
          aria-invalid={!!error}
        />
        {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-description`} className="mb-1 block text-sm font-medium text-slate-700">
          Açıklama <span className="font-normal text-slate-400">(isteğe bağlı)</span>
        </label>
        <textarea
          id={`${idPrefix}-description`}
          rows={2}
          value={values.description}
          maxLength={500}
          placeholder="Kısa bir not ekleyin"
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${idPrefix}-priority`} className="mb-1 block text-sm font-medium text-slate-700">
            Öncelik
          </label>
          <select
            id={`${idPrefix}-priority`}
            value={values.priority}
            onChange={(e) => setValues({ ...values, priority: e.target.value as Priority })}
            className={inputClass}
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-dueDate`} className="mb-1 block text-sm font-medium text-slate-700">
            Son tarih
          </label>
          <input
            id={`${idPrefix}-dueDate`}
            type="date"
            value={values.dueDate ?? ''}
            onChange={(e) => setValues({ ...values, dueDate: e.target.value || null })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}
