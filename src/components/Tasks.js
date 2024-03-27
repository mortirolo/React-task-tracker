//==================================
// Tasks is component of App.  Has Task sub-component
//==================================
import Task from './Task'

//             Deconstructed props
//                 |  -> same as (props) with props.tasks
const Tasks = ({ tasks, onDelete, onToggle }) => {  // onDelete is delete-icon-click-event
  
  return (
    // Create object, iterate over task items w/ .map and populate Task components; ie <h3> tags
    <>  {/* Dont need div */}
      {tasks.map((task) => (  // Array.map produces a list
        <Task key={task.id} task={task}
          onDelete={onDelete} // Need to have a unique key for each list item; task is prop for Task
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default Tasks