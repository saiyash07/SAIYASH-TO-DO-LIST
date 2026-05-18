import './ThemeToggle.css'

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button className="theme-text-btn" onClick={onToggle}>
      {isDark ? 'Light Theme' : 'Dark Theme'}
    </button>
  )
}
