import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import logo from './assets/CareerPilot_Image.png'
import homePreview from './assets/CareerPilot_Home.png'

/* ----------------------------- hooks ----------------------------- */

// Reveals any element with the `reveal` class once it scrolls into view.
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}

// Counts from 0 to `end` once visible.
function useCountUp(end: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(end * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])
  return { ref, value }
}

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { ref, value } = useCountUp(end)
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/* ----------------------------- icons ----------------------------- */

const Icon = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 6" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.3L3 21l1.2-3.6A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18M8 15v3M13 10v8M18 6v12" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
}

/* ----------------------------- data ----------------------------- */

const trusted = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Stripe']

const steps = [
  { n: 1, t: 'Save Jobs', d: 'Save job postings you find across the web into one organized hub.' },
  { n: 2, t: 'Apply & Track', d: 'Apply and track every application status in a single pipeline.' },
  { n: 3, t: 'AI Job Analysis', d: 'AI analyzes the job description and matches it with your skills.' },
  { n: 4, t: 'AI Interview Prep', d: 'Get personalized interview questions based on the job you want.' },
  { n: 5, t: 'Practice & Improve', d: 'Practice with AI feedback and improve your answers over time.' },
  { n: 6, t: 'Track Progress', d: 'Analyze your progress and stay on track toward your goals.' },
  { n: 7, t: 'Get Hired', d: 'Land your dream job and achieve your career goals.' },
  { n: 8, t: 'Grow Further', d: 'Keep leveling up with study recommendations tailored to you.' },
]

const values = [
  { icon: Icon.grid, t: 'All-in-One Platform', d: 'Everything you need in one place.' },
  { icon: Icon.cpu, t: 'AI-Powered', d: 'Smart insights to help you stand out.' },
  { icon: Icon.shield, t: 'Secure & Private', d: 'Your data is encrypted and protected.' },
  { icon: Icon.bolt, t: 'Save Time', d: 'Stay organized and focus on what matters.' },
]

const testimonials = [
  {
    quote: 'CareerPilot turned my chaotic job search into a clear plan. The AI resume analysis got me past ATS filters I kept failing.',
    name: 'Maya Chen',
    role: 'Software Engineer · hired at Stripe',
    color: 'linear-gradient(135deg,#2563eb,#4f8cff)',
    initials: 'MC',
  },
  {
    quote: 'The interview prep is unreal. It generated questions almost identical to what I was actually asked. I walked in confident.',
    name: 'Daniel Osei',
    role: 'Product Manager · hired at Meta',
    color: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    initials: 'DO',
  },
  {
    quote: 'I tracked 40+ applications without a single spreadsheet. The dashboard kept me motivated and on top of follow-ups.',
    name: 'Priya Nair',
    role: 'Data Analyst · hired at Microsoft',
    color: 'linear-gradient(135deg,#0ea5e9,#22d3ee)',
    initials: 'PN',
  },
]

const faqs = [
  {
    q: 'Do I need a credit card to get started?',
    a: 'No. You can create an account and start tracking applications and using the core AI tools for free — no card required.',
  },
  {
    q: 'How does the AI resume analysis work?',
    a: 'Paste a job description and upload your resume. CareerPilot compares them, scores the match, highlights missing keywords and skills, and suggests concrete improvements.',
  },
  {
    q: 'Is my data private and secure?',
    a: 'Yes. Your data is encrypted, protected by row-level security, and never sold. Sensitive operations run on the server, never exposed to the browser.',
  },
  {
    q: 'Can I use CareerPilot for any industry?',
    a: 'Absolutely. The AI adapts to the role and job description you provide, so it works for engineering, design, product, marketing, data, and more.',
  },
  {
    q: 'What makes the interview prep different?',
    a: 'Questions are generated from the specific job description you target — behavioral and technical — and you get personalized feedback so you improve with every practice round.',
  },
]

type Status = 'checking' | 'connected' | 'error'

/* ----------------------------- FAQ item ----------------------------- */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {q}
        <span className="ic">+</span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 0}px` : 0 }}>
        <div className="faq-a-inner" ref={bodyRef}>
          {a}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- App ----------------------------- */

function App() {
  const [status, setStatus] = useState<Status>('checking')
  const [scrolled, setScrolled] = useState(false)

  useScrollReveal()

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => setStatus(error ? 'error' : 'connected'))
      .catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <img src={logo} alt="CareerPilot logo" />
          </a>
          <nav className="nav-links">
            <a className="link hide-sm" href="#features">Features</a>
            <a className="link hide-sm" href="#how">How it works</a>
            <a className="link hide-sm" href="#faq">FAQ</a>
            <a className="link hide-sm" href="#get-started">Sign in</a>
            <a className="btn btn-primary" href="#get-started">
              Get Started {Icon.arrow && <span className="arrow">{Icon.arrow}</span>}
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal">
              <span className="badge">
                <span className="pill">NEW</span> AI career copilot · built for job seekers
              </span>
              <h1>
                Your Career.
                <br />
                <span className="gradient-text">Powered by AI.</span>
              </h1>
              <p className="lead">
                Track applications, prepare smarter, and get hired faster with AI that guides you every step of the way.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#get-started">
                  Get Started <span className="arrow">{Icon.arrow}</span>
                </a>
                <a className="btn btn-ghost" href="#how">
                  <span className="play">{Icon.play}</span> See How It Works
                </a>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="mock">
                <div className="mock-bar">
                  <i></i><i></i><i></i>
                  <span className="url">app.careerpilot.io/dashboard</span>
                </div>
                <div className="mock-body">
                  <div className="mock-head">
                    <div>
                      <h4>Dashboard</h4>
                      <p>Welcome back, John Doe 👋</p>
                    </div>
                    <div className="mock-avatar"></div>
                  </div>
                  <div className="stat-grid">
                    <div className="stat">
                      <div className="label">Applied</div>
                      <div className="value"><Counter end={24} /></div>
                      <div className="trend">↑ 12 this week</div>
                    </div>
                    <div className="stat">
                      <div className="label">Interviews</div>
                      <div className="value"><Counter end={5} /></div>
                      <div className="trend">↑ 2 this week</div>
                    </div>
                    <div className="stat">
                      <div className="label">Offers</div>
                      <div className="value"><Counter end={1} /></div>
                      <div className="trend">Keep it up!</div>
                    </div>
                    <div className="stat">
                      <div className="label">Response</div>
                      <div className="value"><Counter end={25} suffix="%" /></div>
                      <div className="trend">↑ 6% vs last</div>
                    </div>
                  </div>
                  <div className="pipe-title">Application Pipeline</div>
                  <div className="pipe">
                    <div className="pipe-col">
                      <div className="col-h">Interested</div>
                      <div className="chip"><b style={{ background: '#4285f4' }}>G</b> Google</div>
                      <div className="chip"><b style={{ background: '#ff9900' }}>a</b> Amazon</div>
                    </div>
                    <div className="pipe-col">
                      <div className="col-h">Applied</div>
                      <div className="chip"><b style={{ background: '#00a4ef' }}>M</b> Microsoft</div>
                    </div>
                    <div className="pipe-col">
                      <div className="col-h">Interview</div>
                      <div className="chip"><b style={{ background: '#0866ff' }}>f</b> Meta</div>
                    </div>
                    <div className="pipe-col">
                      <div className="col-h">Offer</div>
                      <div className="chip"><b style={{ background: '#e82127' }}>T</b> Tesla</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-card float-match">
                <div className="ring">
                  <div className="pct"><span>85%</span></div>
                  <div>
                    <div className="fc-title">Resume match</div>
                    <div className="fc-value">Great fit</div>
                  </div>
                </div>
              </div>

              <div className="float-card float-interview">
                <div className="ico">{Icon.calendar}</div>
                <div>
                  <div className="fc-title">Upcoming interview</div>
                  <div className="fc-value">Meta · 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Trusted ---------------- */}
        <section className="trusted">
          <div className="container">
            <p>Helping people land roles at top companies</p>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {[...trusted, ...trusted].map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Features ---------------- */}
        <section className="section" id="features">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Features</span>
              <h2>Everything you need to land the job</h2>
              <p>Stop juggling spreadsheets, bookmarks, and a dozen tabs. CareerPilot brings it all together.</p>
            </div>

            {/* Job tracker */}
            <div className="feature-row reveal">
              <div className="f-text">
                <div className="f-icon">{Icon.briefcase}</div>
                <h3>Job Tracker</h3>
                <p>Save postings, track every application's status, and never lose sight of a follow-up again.</p>
                <ul className="f-list">
                  <li><span className="check">{Icon.check}</span> Visual application pipeline</li>
                  <li><span className="check">{Icon.check}</span> Recruiter info &amp; personal notes</li>
                  <li><span className="check">{Icon.check}</span> Interview dates &amp; reminders</li>
                </ul>
              </div>
              <div className="panel">
                <div className="panel-head">
                  <span className="t">Application Pipeline</span>
                  <span className="tag">5 active</span>
                </div>
                <div className="pipe">
                  <div className="pipe-col">
                    <div className="col-h">Applied</div>
                    <div className="chip"><b style={{ background: '#4285f4' }}>G</b> Google</div>
                    <div className="chip"><b style={{ background: '#00a4ef' }}>M</b> Microsoft</div>
                  </div>
                  <div className="pipe-col">
                    <div className="col-h">Interview</div>
                    <div className="chip"><b style={{ background: '#0866ff' }}>f</b> Meta</div>
                  </div>
                  <div className="pipe-col">
                    <div className="col-h">Offer</div>
                    <div className="chip"><b style={{ background: '#e82127' }}>T</b> Tesla</div>
                  </div>
                  <div className="pipe-col">
                    <div className="col-h">Saved</div>
                    <div className="chip"><b style={{ background: '#ff9900' }}>a</b> Amazon</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume analysis */}
            <div className="feature-row reverse reveal">
              <div className="f-text">
                <div className="f-icon">{Icon.doc}</div>
                <h3>AI Resume Analysis</h3>
                <p>Compare your resume against any job description, surface missing skills, and get an instant match score.</p>
                <ul className="f-list">
                  <li><span className="check">{Icon.check}</span> ATS keyword matching</li>
                  <li><span className="check">{Icon.check}</span> Actionable improvement tips</li>
                  <li><span className="check">{Icon.check}</span> Match percentage scoring</li>
                </ul>
              </div>
              <div className="panel">
                <div className="panel-head">
                  <span className="t">Resume Match</span>
                  <span className="tag">Senior Frontend Engineer</span>
                </div>
                <div className="match-big">
                  <div className="num"><Counter end={85} suffix="%" /></div>
                  <div className="sub">Strong match — a few tweaks to go</div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <div className="bar-row"><span className="name">React</span><div className="bar"><span data-w style={{ ['--w' as string]: '95%' }} /></div></div>
                  <div className="bar-row"><span className="name">TypeScript</span><div className="bar"><span data-w style={{ ['--w' as string]: '88%' }} /></div></div>
                  <div className="bar-row"><span className="name">System Design</span><div className="bar"><span data-w style={{ ['--w' as string]: '64%' }} /></div></div>
                  <div className="bar-row"><span className="name">Testing</span><div className="bar"><span data-w style={{ ['--w' as string]: '72%' }} /></div></div>
                </div>
              </div>
            </div>

            {/* Interview prep */}
            <div className="feature-row reveal">
              <div className="f-text">
                <div className="f-icon">{Icon.chat}</div>
                <h3>AI Interview Prep</h3>
                <p>Generate tailored behavioral and technical questions from the exact role you want — then practice with feedback.</p>
                <ul className="f-list">
                  <li><span className="check">{Icon.check}</span> Role-specific question sets</li>
                  <li><span className="check">{Icon.check}</span> Behavioral &amp; technical rounds</li>
                  <li><span className="check">{Icon.check}</span> Personalized AI feedback</li>
                </ul>
              </div>
              <div className="panel">
                <div className="panel-head">
                  <span className="t">Generated Questions</span>
                  <span className="tag">Meta · PM</span>
                </div>
                <div className="q-item"><span className="qn">1</span> Tell me about a product you shipped end to end.</div>
                <div className="q-item"><span className="qn">2</span> How would you prioritize a roadmap with limited engineers?</div>
                <div className="q-item"><span className="qn">3</span> Describe a time you used data to change a decision.</div>
              </div>
            </div>

            {/* Dashboard */}
            <div className="feature-row reverse reveal">
              <div className="f-text">
                <div className="f-icon">{Icon.chart}</div>
                <h3>Smart Dashboard</h3>
                <p>See applications, interviews, offers, and response rate at a glance — with progress charts that keep you motivated.</p>
                <ul className="f-list">
                  <li><span className="check">{Icon.check}</span> Real-time job search metrics</li>
                  <li><span className="check">{Icon.check}</span> Response &amp; conversion rates</li>
                  <li><span className="check">{Icon.check}</span> Study recommendations</li>
                </ul>
              </div>
              <div className="panel">
                <div className="panel-head">
                  <span className="t">This month</span>
                  <span className="tag">On track</span>
                </div>
                <div className="stat-grid">
                  <div className="stat"><div className="label">Applied</div><div className="value"><Counter end={24} /></div></div>
                  <div className="stat"><div className="label">Interviews</div><div className="value"><Counter end={5} /></div></div>
                  <div className="stat"><div className="label">Offers</div><div className="value"><Counter end={1} /></div></div>
                  <div className="stat"><div className="label">Response</div><div className="value"><Counter end={25} suffix="%" /></div></div>
                </div>
                <div style={{ marginTop: 6 }}>
                  <div className="bar-row"><span className="name">Goal progress</span><div className="bar"><span data-w style={{ ['--w' as string]: '78%' }} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="section alt" id="how">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">How it works</span>
              <h2>From first save to signed offer</h2>
              <p>CareerPilot guides you through every stage of the job search — so you always know your next move.</p>
            </div>
            <div className="steps">
              {steps.map((s) => (
                <div className="step reveal" key={s.n}>
                  <div className="n">{s.n}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- App preview ---------------- */}
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">A closer look</span>
              <h2>Your whole job search, one beautiful view</h2>
              <p>Everything from saved jobs to AI insights, designed to keep you organized and moving forward.</p>
            </div>
            <div className="preview-frame reveal">
              <img src={homePreview} alt="CareerPilot product preview" />
            </div>
          </div>
        </section>

        {/* ---------------- Value bar ---------------- */}
        <section className="section alt">
          <div className="container">
            <div className="value-bar reveal">
              {values.map((v) => (
                <div className="value" key={v.t}>
                  <div className="vi">{v.icon}</div>
                  <div>
                    <h4>{v.t}</h4>
                    <p>{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Testimonials ---------------- */}
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Testimonials</span>
              <h2>Loved by job seekers everywhere</h2>
              <p>Real people, real offers. Here's what CareerPilot did for them.</p>
            </div>
            <div className="t-grid">
              {testimonials.map((t) => (
                <div className="tcard reveal" key={t.name}>
                  <div className="stars">★★★★★</div>
                  <blockquote>"{t.quote}"</blockquote>
                  <div className="who">
                    <div className="av" style={{ background: t.color }}>{t.initials}</div>
                    <div>
                      <div className="nm">{t.name}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="section alt" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">FAQ</span>
              <h2>Questions, answered</h2>
              <p>Everything you need to know before you start.</p>
            </div>
            <div className="faq reveal">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="cta-wrap" id="get-started">
          <div className="container">
            <div className="cta reveal">
              <h2>Ready to put your career on autopilot?</h2>
              <p>Join 2,000+ job seekers organizing their search and getting hired faster with CareerPilot.</p>
              <a className="btn btn-primary" href="#">
                Create your free account <span className="arrow">{Icon.arrow}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
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
                <li><a className="f-link" href="#features">Features</a></li>
                <li><a className="f-link" href="#how">How it works</a></li>
                <li><a className="f-link" href="#faq">FAQ</a></li>
                <li><a className="f-link" href="#get-started">Get started</a></li>
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
    </>
  )
}

export default App
