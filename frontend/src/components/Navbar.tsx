import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/CareerPilot_Image.png'
import { Icon } from '../lib/icons'
import { useAuth } from '../lib/auth'

type NavbarProps = {
  // When true, hides the in-page section links (used on auth/standalone pages).
  minimal?: boolean
}

export default function Navbar({ minimal = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link className="brand" to="/">
          <img src={logo} alt="CareerPilot logo" />
        </Link>
        <nav className="nav-links">
          {!minimal && (
            <>
              <a className="link hide-sm" href="/#features">Features</a>
              <a className="link hide-sm" href="/#how">How it works</a>
              <a className="link hide-sm" href="/#faq">FAQ</a>
            </>
          )}
          {session ? (
            <>
              <Link className="link hide-sm" to="/dashboard">Dashboard</Link>
              <button className="btn btn-primary" type="button" onClick={handleSignOut}>
                Sign out <span className="arrow">{Icon.arrow}</span>
              </button>
            </>
          ) : (
            <>
              <Link className="link hide-sm" to="/login">Sign in</Link>
              <Link className="btn btn-primary" to="/signup">
                Get Started <span className="arrow">{Icon.arrow}</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
