import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  // Define 3 states for our component
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()  // prevent the form from actually submitting, giving you a chance
    // to validate or process the input before submitting it to the server or updating
    // the state of your React component

    // Validate from data
    if (!text) {
      alert('Please add a task')
      return
    }

    // Call the function passed in as arg onAdd
    // We are passing it an object with our vars
    // This objects will become a new task object
    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)  // default value is false; it's up to user to toggle to true
  }

  return (
    <form className='add-form' onSubmit={onSubmit} >  {/* onSubmit call above onSubmit func */}
      <div className='form-control'>
        <label>Task</label>
        {/* The value of the input field is text from the state */}
        <input type='text' placeholder='Add Task' value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* Typing triggers onChange which calls setText which sets text to whatever is typed in */}
        {/* e is the event in this control element */}
      </div> 
      <div className='form-control'>
        <label>Day & Time</label>
        <input type='text' placeholder='Add Day and Time' value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div> 
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox' checked={reminder} value={reminder}  // if reminder == true, show checked box
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div> 

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask