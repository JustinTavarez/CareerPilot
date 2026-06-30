import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import logo from '../assets/CareerPilot_Image.png'

type Status = 'checking' | 'connected' | 'error'

export default function Footer() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => setStatus(error ? 'error' : 'connected'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="f-brand">
              <img src={logo} alt="CareerPilot" />
            </div>
            <p className="f-about">
              The AI-powered career copilot that helps you plan, prepare, and achieve your next role.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li><a className="f-link" href="/#features">Features</a></li>
              <li><a className="f-link" href="/#how">How it works</a></li>
              <li><a className="f-link" href="/#faq">FAQ</a></li>
              <li><a className="f-link" href="/signup">Get started</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a className="f-link" href="#">About</a></li>
              <li><a className="f-link" href="#">Blog</a></li>
              <li><a className="f-link" href="#">Careers</a></li>
              <li><a className="f-link" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a className="f-link" href="#">Privacy</a></li>
              <li><a className="f-link" href="#">Terms</a></li>
              <li><a className="f-link" href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CareerPilot · Plan · Prepare · Achieve</span>
          <span className="status">
            <span className={`dot ${status === 'connected' ? 'ok' : status === 'error' ? 'err' : ''}`} />
            {status === 'checking' ? 'Connecting…' : status === 'connected' ? 'Supabase connected' : 'Supabase offline'}
          </span>
        </div>
      </div>
    </footer>
  )
}
