export default function SearchFilterBar({ searchQuery, setSearchQuery, filterPriority, setFilterPriority }) {
  return (
    <div className="search-filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filterPriority === 'all' ? 'active' : ''}`}
          onClick={() => setFilterPriority('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filterPriority === 'high' ? 'active' : ''}`}
          onClick={() => setFilterPriority('high')}
        >
          High
        </button>
        <button 
          className={`filter-btn ${filterPriority === 'medium' ? 'active' : ''}`}
          onClick={() => setFilterPriority('medium')}
        >
          Medium
        </button>
        <button 
          className={`filter-btn ${filterPriority === 'low' ? 'active' : ''}`}
          onClick={() => setFilterPriority('low')}
        >
          Low
        </button>
      </div>
    </div>
  )
}
