# Saiyash To-Do React App

A vibrant, human-centric Kanban-style task manager built with React and Vite. This application features a modern UI with theme toggling, background music, confetti animations, and advanced task management capabilities like snoozing, filtering, and priority tagging.

## Features

- 📝 **Kanban Board**: Organize tasks visually with intuitive "To Do", "Done", and "Snoozed" columns.
- 🎨 **Light/Dark Mode**: Seamless theme toggle for personalized visual comfort.
- 🎵 **Background Music**: Integrated audio player to keep you focused while managing tasks.
- 🎉 **Confetti Celebrations**: Satisfying confetti animation whenever a task is marked as "Done"!
- 🔍 **Search & Filter**: Quickly find tasks with the search bar or filter them by priority (High, Medium, Low).
- 💤 **Snooze Functionality**: Procrastination management—easily snooze tasks to revisit them later.
- 💾 **Local Storage Persistence**: Your tasks, theme preference, and progress are automatically saved in the browser.
- 📊 **Progress Tracker**: Visual progress bar showing completion percentage at the bottom.

## Technologies Used

- **React 19**: Frontend UI library.
- **Vite**: Ultra-fast build tool and development server.
- **Vanilla CSS**: Custom, modern CSS for responsive and dynamic styling.
- **Canvas Confetti**: For celebratory particle effects on task completion.
- **Local Storage API**: For saving application state without needing a backend.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd "TO-DO REACT"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Usage

- **Add a Task**: Use the input form at the top to add a new task. You can specify a tag, due date, priority, and additional notes.
- **Move Tasks**: Click on tasks to move them between "To Do" and "Done", or use the dedicated buttons to snooze/delete them.
- **Toggle Theme/Music**: Use the buttons in the top header to switch between Light/Dark mode or play/pause background music.
- **Filter & Search**: Use the search bar to type keywords, or click the priority filter buttons to narrow down the task list.

## Folder Structure

- `src/App.jsx`: Main application component, holding state and global logic.
- `src/components/`: Contains all reusable UI components (`AddTask.jsx`, `Board.jsx`, `TaskCard.jsx`, `ThemeToggle.jsx`).
- `src/App.css`, `src/components/*.css`: Stylesheets for layout and components.
- `public/bgm.mp3`: Background music file.

## License

This project is licensed under the MIT License.
