import './Navbar.scss'

function Navbar() {
  return (
    <nav className='navbar'>

      <div className='navbar__logo'>
        <span className='blue'>js</span>
        <span className='dot'>.</span>
        functions()
      </div>

      <ul className='navbar__links'>
        <li>
          <a href='#declaration'>
            Declaration
          </a>
        </li>

        <li>
          <a href='#expression'>
            Expression
          </a>
        </li>

        <li>
          <a href='#arrow'>
            Arrow
          </a>
        </li>

        <li>
          <a href='#compare'>
            Taqqoslash
          </a>
        </li>

        <li>
          <a href='#quiz'>
            Test
          </a>
        </li>
      </ul>

      <a href="#declaration" className='navbar__btn'>
        Boshlash
      </a>

    </nav>
  )
}

export default Navbar