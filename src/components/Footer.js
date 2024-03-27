import { Link } from 'react-router-dom'
// Link substitutes <a href=... so we don't reload entire page when following a link; use w/ Routes

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      {/* <a href='/about'>About</a> */}
      <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer