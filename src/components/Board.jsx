import TaskCard from './TaskCard'
import './Board.css'

export default function Board({ todos, done, snoozed, onMoveToDone, onMoveBack, onDelete, onSnooze, onMoveFromSnoozed, onDeleteSnoozed }) {
  return (
    <div className="board">
      <div className="column todo-col">
        <div className="col-header">
          <span className="col-dot todo-dot"></span>
          <h2>To Do</h2>
          <span className="count-badge">{todos.length}</span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div className="task-list">
            {todos.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onMoveToDone(task)}
                onSnooze={() => onSnooze(task)}
                hint="Tap to mark done"
                type="todo"
              />
            ))}
          </div>
        )}
      </div>

      <div className="divider">
        <span className="divider-icon">→</span>
      </div>

      <div className="column done-col">
        <div className="col-header">
          <span className="col-dot done-dot"></span>
          <h2>Done</h2>
          <span className="count-badge done-badge">{done.length}</span>
        </div>

        {done.length === 0 ? (
          <div className="empty-state">
            <p>Nothing here yet. Get going!</p>
          </div>
        ) : (
          <div className="task-list">
            {done.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onMoveBack={() => onMoveBack(task)}
                onDelete={() => onDelete(task)}
                type="done"
              />
            ))}
          </div>
        )}
      </div>

      <div className="divider">
        <span className="divider-icon">→</span>
      </div>

      <div className="column snoozed-col">
        <div className="col-header">
          <span className="col-dot snoozed-dot"></span>
          <h2>Snoozed</h2>
          <span className="count-badge snoozed-badge">{snoozed.length}</span>
        </div>

        {snoozed.length === 0 ? (
          <div className="empty-state">
            <p>No snoozed tasks</p>
          </div>
        ) : (
          <div className="task-list">
            {snoozed.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onMoveFromSnoozed={() => onMoveFromSnoozed(task)}
                onDeleteSnoozed={() => onDeleteSnoozed(task)}
                type="snoozed"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
