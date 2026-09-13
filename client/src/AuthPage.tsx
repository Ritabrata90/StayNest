import { useState } from 'react'
import type { FormEvent } from 'react'
import './AuthPage.css'

type AuthMode = 'login' | 'signup'

type AuthPageProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onBack: () => void
}

function AuthPage({ mode, onModeChange, onBack }: AuthPageProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="auth-page">
      <div className="auth-art" aria-hidden="true">
        <div className="auth-art-copy">
          <span className="auth-art-index">STAYNEST / 01</span>
          <h1>Make room<br /><em>for wonder.</em></h1>
          <p>Thoughtful places for the stories you have not lived yet.</p>
        </div>
        <span className="auth-art-location">Quiet mornings / Munnar</span>
      </div>
      <div className="auth-panel">
        <button className="auth-back" type="button" onClick={onBack}>← Back to stays</button>
        <div className="auth-heading">
          <p className="eyebrow">Your next chapter</p>
          <h2>{mode === 'login' ? 'Welcome back.' : 'Come stay awhile.'}</h2>
          <p>{mode === 'login' ? 'Sign in to pick up where you left off.' : 'Create an account for stays worth remembering.'}</p>
        </div>
        <div className="auth-tabs" role="tablist" aria-label="Account access">
          <button className={mode === 'login' ? 'auth-tab active' : 'auth-tab'} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => { setSubmitted(false); onModeChange('login') }}>Log in</button>
          <button className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'} type="button" role="tab" aria-selected={mode === 'signup'} onClick={() => { setSubmitted(false); onModeChange('signup') }}>Sign up</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && <label>Full name<input type="text" name="name" placeholder="Your name" required /></label>}
          <label>Email address<input type="email" name="email" placeholder="you@example.com" required /></label>
          <label>Password<input type="password" name="password" placeholder="At least 8 characters" minLength={8} required /></label>
          {mode === 'login' && <button className="forgot-link" type="button">Forgot password?</button>}
          <button className="auth-submit" type="submit">{mode === 'login' ? 'Log in' : 'Create account'} <span>↗</span></button>
        </form>
        {submitted && <p className="auth-success">You are all set. Account connection is ready for the next step.</p>}
        <p className="auth-legal">By continuing, you agree to StayNest's terms and privacy policy.</p>
      </div>
    </section>
  )
}

export default AuthPage
