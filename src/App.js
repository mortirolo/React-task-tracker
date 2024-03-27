// **************************
// Traversy Media totorial on learning React - Create a task tracker
// https://youtube.com/watch?v=w7ejDZ8SWv8
// **************************
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// useEffect often used when we want something to happen upon page load
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'  // Uses above Router

function App() {
  // STATES
  // STATES THAT NEED TO BE SHARED WITH MULTIPLE COMPONENTS SHOULD BE AT THE TOP LEVEL FOR EASE OF ACCESS
  // ie. don't put state at the component level unless required
  // Create a state called tasks that handles events on tasks data
  // setTasks is used to change the tasks state
  // Add test data to default state
  const [tasks, setTasks] = useState([])  // TEST DATA, real-world data comes from back-end framework
  /*  [{
    id: 1,
    text: 'Doctor\'s Appointment',
    day: 'Feb 5th at 2:30PM',
    reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at school',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th and 2:30pm',
      reminder: false,
    },
  ]); */
  
  // State for the add task button
  // default false bc we dont want to display form until Add button clicked
  const [showAddTask, setShowAddTask] = useState(false)

  // **************************
  // CONNECT TO BACK-END, in this case JSON-server
  // To load/store data, we transact with json-server's fetch API using async await
  // Fetch all tasks for loading into web page
  const fetchTasks = async () => {
    // fetch returns a 'promise' so we await that promise
    const res = await fetch('http://localhost:5000/tasks')  // wait for response
    const data = await res.json()  // retrieve data from response

    console.log(data)
    return data
  }

  // Fetch single task
  const fetchTask = async (id) => {
    // fetch returns a 'promise' so we await that promise
    const res = await fetch(`http://localhost:5000/tasks/${id}`)  // wait for response, Note backtick, need since we have a var
    const data = await res.json()  // retrieve data from response

    console.log(data)
    return data
  }

  // Fetch data upon page load
  useEffect(() => {  // useEffect triggered on page load
    // fetchTasks returns a 'promise' so we call it with async, await
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()  // wait for response
      setTasks(tasksFromServer)  // send tasks data to frontend tasks array
    }

    getTasks()
  }, [])  // Empty array can be populated with dependencies where, if the dep. value changes,
          // fetchTasks gets run
  

  // **************************
  // Add Task Form Handler
  const addTask = async (task) => {
    // Send data to backend via POST req to save in DB
    // Note that the backend creates the id, so we don't have to do that here
    // res := response
    const res = await fetch ('http://localhost:5000/tasks', {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)  // Convert JS object to JSON string
    })
    // Returned response includes data that was added plus .id which was added by back-end
    const data = await res.json()
    setTasks([...tasks, data])  // Add new task to front-end Tasks 

    // For initial development; save data on front-end until we have working back-end
    // We also need to create a unique id since we don't have a backend
    /*
    const id = Math.floor(Math.floor(Math.random() * 10000) + 1)
    console.log(id)
    const newTask = { id, ...task }  // new task objects to be added to tasks array
    setTasks([...tasks, newTask])  // Append newTask to Tasks array
    */
  }

  // **************************
  // Delete task
  // This gets called by onClick in Tasks/Task when user clicks delete icon
  // This func gets passed via onDelete prop to Tasks/Task which executes is w/ task.id argument
  //const deleteTask = (id) => {  // For dev prior to haveing backend
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { // Note backticks ``
      method: 'DELETE'
    })
    // .filter is higher order JS function
    // task.id is being filtered out of data array
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // **************************
  // Toggle Reminder
  // const toggleReminder = (id) => {  // dev code when we have no backend
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)  // get the task that needs to be toggled
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}  // This is an event object

    const res = await fetch(  // handle response
      `http://localhost:5000/tasks/${id}`, { // Send data update to server
        method:'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(updTask)  //
      }
    )
    
    const data = await res.json()  // recieve the update task data from server

    // We call setTasks bc we want to alter state Tasks
    setTasks(
      tasks.map((task) => 
        // ...task means spread accross (keep the same) all tasks properties but change reminder
        task.id === id ?
        // {...task, reminder: !task.reminder}  // dev code
        {...task, reminder: data.reminder}  // code with backend in place
        : task
      )
    )
  }

  // **************************
  // Render our app
  return ( // JSX within return(), JS above
    <Router>  {/* All output should be wrapped in Router */}
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/'
            element= {
              <>
                {showAddTask && <AddTask onAdd={addTask} />}  {/* pass func addTask as prop to AddTask */}
                {tasks.length > 0 ?  // Only show tasks if we have them, otherwise default msg
                  (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) :
                  ('No Tasks')
                }
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      
      </div>
    </Router>
  );

  // **************************
  // Code with Backend but without Routes
  // return ( // JSX within return(), JS above
  //     <div className="container">
  //       <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
  //       {showAddTask && <AddTask onAdd={addTask} />}  {/* pass func addTask as prop to AddTask */}
  //       {tasks.length > 0 ? (  // Only show tasks if we have them, otherwise default msg
  //         <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
  //         ) : (  'No Tasks'
  //       )}
  //       <About />
  //       <Footer />
      
  //     </div>
  // );
  
  // **************************
  // Dev code, prior to having backend set up
  // return (
  //   <div className="container">
  //     {/* Instantiate Header component; Header component reads title property*/}
  //     {/* props: item1={21}, item2={myBoolean},  item3={my_function} */}
  //     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
  //     {/* If showAddTask is true, show AddTask form component */}
  //     {showAddTask && <AddTask onAdd={addTask} />}  {/* pass func addTask as prop to AddTask */}
  //     {/* Props to the Task component: task data, delete event,  */}
  //     {/*         prop   prop-data     here we pass a func instead of data */}
  //     {/*          |       |                  |        */}
  //     {/* <Tasks tasks={tasks} onDelete={deleteTask} />  {/* Add tasks to Tasks' props so that it can recieve tasks data */}
  //     {tasks.length > 0 ? (  // Only show tasks if we have them, otherwise default msg
  //       <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
  //       ) : (  'No Tasks'
  //     )}
  //   </div>
  // );

}

//Example class-based component:
/*import React from 'react'
class App extends React.Component {
  render() {
    return <h1>My Class-Based Component</h1>
  }
}*/

export default App;
