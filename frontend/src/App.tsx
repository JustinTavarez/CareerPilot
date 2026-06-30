import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

type Status = 'checking' | 'connected' | 'error'

const features = [
  {
    icon: '📋',
    title: 'Job Tracker',
    desc: 'Save postings, track application status, store recruiter info, and keep notes — all in one place.',
  },
  {
    icon: '🤖',
    title: 'AI Resume Analysis',
    desc: 'Compare your resume against a job description, surface missing skills, and get a match score.',
  },
  {
    icon: '🎯',
    title: 'AI Interview Prep',
    desc: 'Generate tailored behavioral and technical questions, then practice with personalized feedback.',
  },
  {
    icon: '📊',
    title: 'Dashboard',
    desc: 'See applications, interviews, offers, and response rate at a glance with progress charts.',
  },
  {
    icon: '📚',
    title: 'Study Recommendations',
    desc: 'CareerPilot analyzes your interview performance and recommends topics to improve.',
  },
  {
    icon: '🔒',
    title: 'Secure by Design',
    desc: 'Auth and row-level security keep your data private. Secrets stay on the server, never the browser.',
  },
]

function App() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => setStatus(error ? 'error' : 'connected'))
      .catch(() => setStatus('error'))
  }, [])

  const statusLabel =
    status === 'checking'
      ? 'Checking Supabase…'
      : status === 'connected'
        ? 'Supabase connected'
        : 'Supabase not reachable'

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <span className="brand-mark">✈</span>
            CareerPilot
          </div>
          <nav className="nav-links">
            <a className="hide-sm" href="#features">
              Features
            </a>
            <a className="hide-sm" href="#get-started">
              Get started
            </a>
            <a className="btn btn-ghost" href="#get-started">
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container hero">
          <span className="badge">
            <span className={`dot ${status === 'connected' ? 'ok' : status === 'error' ? 'err' : ''}`} />
            {statusLabel}
          </span>
          <h1>
            Your entire job search, <span className="gradient-text">on autopilot</span>
          </h1>
          <p className="lead">
            CareerPilot brings job tracking, AI resume analysis, and interview prep into one place — so you
            stay organized and land your next role faster.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#get-started">
              Get started free
            </a>
            <a className="btn btn-ghost" href="#features">
              Explore features
            </a>
          </div>
        </section>

        <section id="features" className="container section">
          <div className="section-head">
            <h2>Everything you need to land the job</h2>
            <p>Stop juggling spreadsheets, bookmarks, and a dozen tabs. CareerPilot does it all.</p>
          </div>
          <div className="grid">
            {features.map((f) => (
              <article className="card" key={f.title}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="get-started" className="container">
          <div className="cta">
            <h2>Ready to take off?</h2>
            <p>Create an account and start organizing your job search in minutes.</p>
            <a className="btn btn-primary" href="#">
              Create your account
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} CareerPilot</span>
          <span>Built with React, TypeScript &amp; Supabase</span>
        </div>
      </footer>
    </>
  )
}

export default App
