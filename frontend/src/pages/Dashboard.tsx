import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { Icon } from '../lib/icons'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? null
  const greeting = fullName ?? user?.email ?? 'there'

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <>
      <Navbar minimal />
      <main className="auth-wrap">
        <div className="auth-card reveal-visible">
          <div className="auth-head">
            <h1>Welcome, {greeting}</h1>
            <p>You're signed in to CareerPilot. Your job tracker and AI tools will live here.</p>
          </div>

          <p className="auth-alt">Signed in as {user?.email}</p>

          <button className="btn btn-primary auth-submit" type="button" onClick={handleSignOut}>
            Sign out <span className="arrow">{Icon.arrow}</span>
          </button>
        </div>
      </main>
    </>
  )
}
