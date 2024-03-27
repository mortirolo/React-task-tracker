//==================================
// Task is a sub-component of Tasks
//==================================
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {  // onDelete is delete-icon-click-event
  return (
    // task data object comes from App.js
    // On click, use arrow func to pass task.id to the onDelete func in App  
    // When user double-clicks task item, we call func pointed to by onToggle (toggleReminder) in App
    // and pass it task's id
    // If task.reminder true, highlight border green, elso do nothing
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.text} {' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer'}}
          onClick={() => onDelete(task.id)}
        /></h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task