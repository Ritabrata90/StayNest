import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import MapView from './MapView'
import AuthPage from './AuthPage'
import ListingDetail from './ListingDetail'

export type Stay = { id: string; title: string; city: string; country: string; category: string; pricePerNight: number; rating: number; reviewCount?: number; imageUrl: string }
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1'

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null)
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null)
  const [activeCategory, setActiveCategory] = useState('All stays')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [location, setLocation] = useState('')
  const [searchedLocation, setSearchedLocation] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [stays, setStays] = useState<Stay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const loadListings = async () => {
      try {
        const params = new URLSearchParams()
        if (searchedLocation) params.set('location', searchedLocation)
        const response = await fetch(`${apiBaseUrl}/listings${params.toString() ? `?${params}` : ''}`)
        if (!response.ok) throw new Error('The listing service is unavailable.')
        const payload: { success: boolean; data: Stay[]; message?: string } = await response.json()
        if (!payload.success) throw new Error(payload.message ?? 'Unable to load stays.')
        setStays(payload.data)
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load stays.')
      } finally {
        setIsLoading(false)
      }
    }
    void loadListings()
  }, [searchedLocation])

  return (
    <main>
      <nav className="nav"><button className="brand" type="button" onClick={() => { setAuthMode(null); setSelectedStay(null) }}>stay<span>nest</span></button><div className="nav-links"><a href="#stays" onClick={() => { setAuthMode(null); setSelectedStay(null) }}>Explore</a><a href="#host">Become a host</a><button className="nav-login" type="button" onClick={() => { setSelectedStay(null); setAuthMode('login') }}>Log in</button><button className="nav-signup" type="button" onClick={() => { setSelectedStay(null); setAuthMode('signup') }}>Sign up</button><button className="profile" aria-label="Open profile" type="button" onClick={() => { setSelectedStay(null); setAuthMode('login') }}>◌</button></div></nav>
      {authMode ? <AuthPage mode={authMode} onModeChange={setAuthMode} onBack={() => setAuthMode(null)} /> : selectedStay ? <ListingDetail stay={selectedStay} onClose={() => setSelectedStay(null)} /> : <>
      <section className="hero"><div className="hero-copy"><p className="eyebrow">A softer way to get away</p><h1>Stay somewhere<br /><em>worth remembering.</em></h1><p className="hero-text">Handpicked homes, cabins, and quiet corners for the days you want to keep.</p><form className="search-panel" onSubmit={(event) => { event.preventDefault(); setSearchedLocation(location.trim()) }}><label>Where <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Search destinations" /></label><label>When <input placeholder="Add dates" /></label><label>Who <input placeholder="Add guests" /></label><button className="search-button" type="submit" aria-label="Search">⌕</button></form></div><div className="hero-note"><span>01 / 04</span><p>Homes with<br />a sense of place</p></div></section>
      <section className="content" id="stays"><div className="section-heading"><div><p className="eyebrow">Find your next chapter</p><h2>Stays made for slowing down.</h2></div><button className="outline-button" onClick={() => setViewMode((current) => current === 'grid' ? 'map' : 'grid')} aria-pressed={viewMode === 'map'}>{viewMode === 'grid' ? 'View map' : 'View list'} <span>{viewMode === 'grid' ? '⌖' : '▦'}</span></button></div><div className="categories">{['All stays', 'Forest stays', 'Beach escapes', 'Design stays', 'Mountain stays'].map((category) => <button className={activeCategory === category ? 'category active' : 'category'} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>{isLoading && <p className="data-message">Loading stays from the database...</p>}{loadError && <p className="data-message error">{loadError} Run `npm run seed --workspace server` after starting MongoDB.</p>}{viewMode === 'map' ? <MapView stays={stays.filter((stay) => activeCategory === 'All stays' || stay.category === activeCategory)} /> : <div className="listing-grid">{stays.filter((stay) => activeCategory === 'All stays' || stay.category === activeCategory).map((stay) => <article className="listing" key={stay.id} role="button" tabIndex={0} onClick={() => setSelectedStay(stay)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedStay(stay) }}><div className="image-wrap"><img src={stay.imageUrl} alt={stay.title} /><button className={saved.includes(stay.id) ? 'heart saved' : 'heart'} onClick={(event) => { event.stopPropagation(); setSaved((current) => current.includes(stay.id) ? current.filter((item) => item !== stay.id) : [...current, stay.id]) }} aria-label={`Save ${stay.title}`}>{saved.includes(stay.id) ? '♥' : '♡'}</button></div><div className="listing-info"><div><h3>{stay.title}</h3><p>{stay.city}, {stay.country}</p></div><span className="rating">★ {stay.rating}</span></div><p className="price"><strong>${stay.pricePerNight}</strong> night</p></article>)}</div>}</section>
      </>}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-intro"><a className="brand" href="#stays">stay<span>nest</span></a><p>Places that feel like yours.</p><span>Thoughtful stays for the days you want to keep.</span></div>
          <div className="footer-column"><strong>Explore</strong><a href="#stays">All stays</a><a href="#stays">Map view</a><a href="#host">Become a host</a></div>
          <div className="footer-column"><strong>StayNest</strong><a href="#about">About us</a><a href="#journal">Journal</a><a href="mailto:hello@staynest.example">Contact</a></div>
          <div className="footer-note"><span>Made for slower mornings.</span><span>Built around a sense of place.</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 StayNest</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><span>India · English · USD</span></div></div>
      </footer>
    </main>
  )
}

export default App
