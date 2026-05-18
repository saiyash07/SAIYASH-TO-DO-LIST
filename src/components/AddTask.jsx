import { useState } from 'react'
import './AddTask.css'

const tags = ['work', 'personal', 'health', 'other']
const priorities = ['low', 'medium', 'high']

export default function AddTask({ onAdd }) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('personal')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [notes, setNotes] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim(), tag, date, priority, notes.trim())
    setText('')
    setTag('personal')
    setDate('')
    setPriority('medium')
    setNotes('')
    setOpen(false)
  }

  return (
    <div className="add-task-wrapper">
      {!open ? (
        <button className="add-trigger" onClick={() => setOpen(true)}>
          <span className="plus-icon">+</span>
          Add a new task
        </button>
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            autoFocus
            className="task-input"
            type="text"
            placeholder="What needs to get done?"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          
          <div className="form-section">
            <span className="section-label">Category</span>
            <div className="selector-row">
              {tags.map(t => (
                <button
                  key={t}
                  type="button"
                  className={`opt-btn ${tag === t ? 'selected' : ''}`}
                  onClick={() => setTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <span className="section-label">Priority</span>
            <div className="selector-row">
              {priorities.map(p => (
                <button
                  key={p}
                  type="button"
                  className={`opt-btn ${priority === p ? 'selected' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <span className="section-label">Date (Optional)</span>
            <input
              className="date-input"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div className="form-section">
            <span className="section-label">Notes (Optional)</span>
            <textarea
              className="notes-input"
              placeholder="Add details about this task..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-actions-row">
            <button type="button" className="cancel-btn" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add task
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
