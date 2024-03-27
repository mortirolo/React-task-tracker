
//import React from 'react'  // This statement no longer required
import PropTypes from 'prop-types'  // Not necessary
import { useLocation } from 'react-router-dom'
import Button from './Button'

//const Header = (props) => {  // props takes in properties from App where Header is instantiated
const Header = ({ title, onAdd, showAdd }) => {  // Destructured version of above; more common
  const location = useLocation()  // Used to only show button when we are in home path

  // For initial testing of Add button
  /*
  const onClick = () => {
    console.log('Click');
  }
  */

  return (
    <header className='header'>
      {/*<h1>{props.title}</h1>*/}
      <h1>{title}</h1>  {/* Destructured version of above */}
      {/* <Button color='green' text='Add' onClick={onClick}/> */}
      {/* Change color & text depending on if the form is displayed */}
      {/* // only show button on homepage(ie. with task list), not other pages */}
      {location.pathname === '/' &&
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      }
    </header>
  )
}

// If instantiated Header component has no title property, use the default
// Props in instantiation over-ride these defaults
Header.defaultProps = {
  title: 'Task Tracker'
}

// PropTypes NOT NECESSARY;  USE TYPESCRIPT
// Helps us catch errors with variable types

Header.propTypes = {
  title: PropTypes.string.isRequired  // Checks that value is entered and type is string
}

// We cand have a style object locally, if we wish;  add it to <h1>
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }

//The export default syntax allows you to export a single value from a module as the default export
export default Header
