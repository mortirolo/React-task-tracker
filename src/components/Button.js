import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

  return (
    <button
      onClick={onClick}
      className='btn'
      style={{backgroundColor: color}}
    >
      {text}  {/* text comes from Header.js */}
    </button>
  )
}

// Default properties
Button.defaultProps = {
  color: 'steelblue',
}

// Property type-checking
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}


export default Button