export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

/** Formdan gelen, kullanıcının düzenleyebildiği alanlar */
export type TaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'>

export type StatusFilter = 'all' | 'active' | 'completed'

export type SortOption = 'newest' | 'oldest' | 'priority' | 'dueDate'

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}
