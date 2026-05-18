import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import Board from './Board'
import AddTask from './AddTask'
import Header from './Header'
import Footer from './Footer'
import SearchFilterBar from './SearchFilterBar'

const initialTasks = [
  { id: 1, text: 'Buy groceries', tag: 'personal', date: '', priority: 'medium', notes: '' },
  { id: 2, text: 'Finish project report', tag: 'work', date: '', priority: 'high', notes: '' },
  { id: 3, text: 'Call mom', tag: 'personal', date: '', priority: 'low', notes: '' },
  { id: 4, text: 'Review pull requests', tag: 'work', date: '', priority: 'high', notes: '' },
  { id: 5, text: 'Workout session', tag: 'health', date: '', priority: 'medium', notes: '' },
]

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('saiyash_todos')
    return saved ? JSON.parse(saved) : initialTasks
  })
  const [done, setDone] = useState(() => {
    const saved = localStorage.getItem('saiyash_done')
    return saved ? JSON.parse(saved) : []
  })
  const [snoozed, setSnoozed] = useState(() => {
    const saved = localStorage.getItem('saiyash_snoozed')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const removeEmojis = (text) => {
      return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{2713}]|[\u{2B06}]|[\u{2B07}]|[\u{2B05}]|[\u{27A1}]|[\u{1F4}]|[\u{1F5}]|[\u{1F6}]|[\u{1F7}]|[\u{1F8}]|[\u{1F9}]|[\u{1FA}]|[\u{1FB}]|[\u{1FC}]|[\u{1FD}]|[\u{1FE}]|[\u{1FF}]/gu, '').trim()
    }
    
    const cleanTasks = (tasks) => {
      return tasks.map(task => ({
        ...task,
        text: removeEmojis(task.text)
      }))
    }
    
    setTodos(prev => cleanTasks(prev))
    setDone(prev => cleanTasks(prev))
    setSnoozed(prev => cleanTasks(prev))
  }, [])

  useEffect(() => {
    localStorage.setItem('saiyash_todos', JSON.stringify(todos))
    localStorage.setItem('saiyash_done', JSON.stringify(done))
    localStorage.setItem('saiyash_snoozed', JSON.stringify(snoozed))
  }, [todos, done, snoozed])

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? JSON.parse(saved) : false
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const audioRef = useRef(null)
  const hasInteractedRef = useRef(false)

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark))
  }, [isDark])

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteractedRef.current && !isPlaying && audioRef.current) {
        hasInteractedRef.current = true
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(err => console.log("Autoplay blocked:", err))
      }
      document.removeEventListener('click', handleInteraction)
    }
    document.addEventListener('click', handleInteraction)
    return () => document.removeEventListener('click', handleInteraction)
  }, [isPlaying])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(e => console.log(e))
        setIsPlaying(true)
      }
    }
  }

  const moveToDone = (task) => {
    setTodos(prev => prev.filter(t => t.id !== task.id))
    setDone(prev => [...prev, task])
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#16a34a', '#f59e0b', '#ec4899']
    })
  }

  const moveBackToTodo = (task) => {
    setDone(prev => prev.filter(t => t.id !== task.id))
    setTodos(prev => [...prev, task])
  }

  const deleteTask = (task) => {
    setDone(prev => prev.filter(t => t.id !== task.id))
  }

  const snoozeTask = (task) => {
    setTodos(prev => prev.filter(t => t.id !== task.id))
    setSnoozed(prev => [...prev, task])
  }

  const moveFromSnoozed = (task) => {
    setSnoozed(prev => prev.filter(t => t.id !== task.id))
    setTodos(prev => [...prev, task])
  }

  const deleteSnoozed = (task) => {
    setSnoozed(prev => prev.filter(t => t.id !== task.id))
  }

  const filterTasks = (tasks) => {
    return tasks.filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
      return matchesSearch && matchesPriority
    })
  }

  const addTask = (text, tag, date, priority = 'medium', notes = '') => {
    const newTask = {
      id: Date.now(),
      text,
      tag,
      date,
      priority,
      notes
    }
    setTodos(prev => [...prev, newTask])
  }

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <Header 
        isPlaying={isPlaying} 
        toggleMusic={toggleMusic} 
        isDark={isDark} 
        setIsDark={setIsDark} 
      />

      <audio ref={audioRef} src="/bgm.mp3" loop />

      <AddTask onAdd={addTask} />

      <SearchFilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />

      <Board
        todos={filterTasks(todos)}
        done={filterTasks(done)}
        snoozed={filterTasks(snoozed)}
        onMoveToDone={moveToDone}
        onMoveBack={moveBackToTodo}
        onDelete={deleteTask}
        onSnooze={snoozeTask}
        onMoveFromSnoozed={moveFromSnoozed}
        onDeleteSnoozed={deleteSnoozed}
      />

      <Footer 
        todosCount={todos.length}
        doneCount={done.length}
        snoozedCount={snoozed.length}
      />
    </div>
  )
}
