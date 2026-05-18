export default function Footer({ todosCount, doneCount, snoozedCount }) {
  const total = todosCount + doneCount
  const progress = total === 0 ? 0 : (doneCount / total) * 100

  return (
    <footer className="app-footer">
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>{total} tasks · {doneCount} done</p>
      {snoozedCount > 0 && (
        <p className="snoozed-text">{snoozedCount} snoozed until tomorrow</p>
      )}
    </footer>
  )
}
