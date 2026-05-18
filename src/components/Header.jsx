import ThemeToggle from './ThemeToggle'

export default function Header({ isPlaying, toggleMusic, isDark, setIsDark }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <h1>SAIYASH TO DO LIST</h1>
        <div className="header-actions">
          <button 
            className="music-toggle" 
            onClick={toggleMusic}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(prev => !prev)} />
        </div>
      </div>
      <p className="header-sub">tap a task to move it · stay on top of your day</p>
    </header>
  )
}
