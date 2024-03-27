import { Link } from 'react-router-dom'
// Link substitutes <a href=... so we don't reload entire page when following a link; use w/ Routes

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      {/* <a href='/'>Go Back</a> */}
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default About