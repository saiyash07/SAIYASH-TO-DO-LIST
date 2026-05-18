import { useState } from 'react'
import './TaskCard.css'

const tagColors = {
  work: { bg: '#e8f0fe', text: '#3b5bdb', dot: '#4c6ef5' },
  personal: { bg: '#fff3e0', text: '#e67700', dot: '#fd7e14' },
  health: { bg: '#e6fcf5', text: '#087f5b', dot: '#20c997' },
  other: { bg: '#f3f0ff', text: '#6741d9', dot: '#845ef7' },
}

const priorityColors = {
  high: { bg: '#ffe0e0', text: '#d32f2f', icon: '' },
  medium: { bg: '#fff3e0', text: '#f57c00', icon: '' },
  low: { bg: '#e8f5e9', text: '#558b2f', icon: '' },
}

export default function TaskCard({ task, onClick, onMoveBack, onDelete, onSnooze, onMoveFromSnoozed, onDeleteSnoozed, hint, type }) {
  const [showActions, setShowActions] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const colors = tagColors[task.tag] || tagColors.other
  const priorityColor = priorityColors[task.priority] || priorityColors.medium

  if (type === 'todo') {
    return (
      <div
        className={`task-card todo-card ${showActions ? 'expanded' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        title={hint}
      >
        <div className="task-main">
          <div className="checkbox-ring" />
          <span className="task-text">{task.text}</span>
        </div>
        <div className="meta-row">
          <span
            className="tag-pill inline"
            style={{ background: colors.bg, color: colors.text }}
          >
            <span
              className="tag-dot"
              style={{ background: colors.dot }}
            />
            {task.tag}
          </span>
          <span
            className="priority-pill"
            style={{ background: priorityColor.bg, color: priorityColor.text }}
          >
            {priorityColor.icon} {task.priority}
          </span>
          {task.date && (
            <span className="date-pill">{task.date}</span>
          )}
        </div>

        {task.notes && (
          <div className="notes-preview">
            <button 
              className="notes-toggle"
              onClick={(e) => { e.stopPropagation(); setShowNotes(!showNotes); }}
              title="Toggle notes"
            >
              {showNotes ? 'v' : '>'} Notes
            </button>
            {showNotes && (
              <div className="notes-content" onClick={(e) => e.stopPropagation()}>
                {task.notes}
              </div>
            )}
          </div>
        )}

        <div className={`action-row ${showActions ? 'visible' : ''}`}>
          <button 
            className="action-btn snooze-btn" 
            onClick={(e) => { e.stopPropagation(); onSnooze(); }}
          >
            Not Today
          </button>
        </div>
      </div>
    )
  }

  if (type === 'snoozed') {
    return (
      <div
        className={`task-card snoozed-card ${showActions ? 'expanded' : ''}`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="task-main">
          <div className="checkbox-ring" />
          <span className="task-text">{task.text}</span>
        </div>

        <div className="meta-row">
          <span
            className="tag-pill inline"
            style={{ background: colors.bg, color: colors.text }}
          >
            <span
              className="tag-dot"
              style={{ background: colors.dot }}
            />
            {task.tag}
          </span>
          <span
            className="priority-pill"
            style={{ background: priorityColor.bg, color: priorityColor.text }}
          >
            {priorityColor.icon} {task.priority}
          </span>
        </div>

        {task.notes && (
          <div className="notes-preview">
            <button 
              className="notes-toggle"
              onClick={(e) => { e.stopPropagation(); setShowNotes(!showNotes); }}
              title="Toggle notes"
            >
              {showNotes ? 'v' : '>'} Notes
            </button>
            {showNotes && (
              <div className="notes-content" onClick={(e) => e.stopPropagation()}>
                {task.notes}
              </div>
            )}
          </div>
        )}

        <div className={`action-row ${showActions ? 'visible' : ''}`}>
          <button className="action-btn unsnooze-btn" onClick={onMoveFromSnoozed}>
            Back to Tasks
          </button>
          <button className="action-btn delete-btn" onClick={onDeleteSnoozed}>
            Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`task-card done-card ${showActions ? 'expanded' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="task-main">
        <div className="checkbox-checked">x</div>
        <span className="task-text done-text">{task.text}</span>
      </div>

      <div className="meta-row">
        <span
          className="tag-pill inline"
          style={{ background: colors.bg, color: colors.text }}
        >
          <span
            className="tag-dot"
            style={{ background: colors.dot }}
          />
          {task.tag}
        </span>
        <span
          className="priority-pill"
          style={{ background: priorityColor.bg, color: priorityColor.text }}
        >
          {priorityColor.icon} {task.priority}
        </span>
      </div>

      {task.notes && (
        <div className="notes-preview">
          <button 
            className="notes-toggle"
            onClick={(e) => { e.stopPropagation(); setShowNotes(!showNotes); }}
            title="Toggle notes"
          >
            {showNotes ? 'v' : '>'} Notes
          </button>
          {showNotes && (
            <div className="notes-content" onClick={(e) => e.stopPropagation()}>
              {task.notes}
            </div>
          )}
        </div>
      )}

      <div className={`action-row ${showActions ? 'visible' : ''}`}>
        <button className="action-btn undo-btn" onClick={onMoveBack}>
          Move back
        </button>
        <button className="action-btn delete-btn" onClick={onDelete}>
          Remove
        </button>
      </div>
    </div>
  )
}
