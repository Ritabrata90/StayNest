import type { Stay } from './App'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { cityCoordinates, markerIcon } from './MapView'
import './ListingDetail.css'

type ListingDetailProps = {
  stay: Stay
  onClose: () => void
}

function ListingDetail({ stay, onClose }: ListingDetailProps) {
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false)
  const [isReservationSubmitted, setIsReservationSubmitted] = useState(false)
  const reviewCount = stay.reviewCount ?? 0
  const position: LatLngExpression = cityCoordinates[stay.city] ?? [22.5, 79]

  const handleReservationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsReservationSubmitted(true)
  }

  const closeReservation = () => {
    setIsReservationSubmitted(false)
    setIsReservationFormOpen(false)
  }

  return (
    <section className="listing-detail" aria-labelledby="listing-detail-title">
      <button className="detail-back" type="button" onClick={onClose}>← Back to stays</button>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img src={stay.imageUrl} alt={stay.title} />
          <span className="detail-location">{stay.city} / {stay.country}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{stay.category}</p>
          <h1 id="listing-detail-title">{stay.title}</h1>
          <div className="detail-meta"><span>★ {stay.rating} <small>({reviewCount} reviews)</small></span><span>{stay.city}, {stay.country}</span></div>
          <p className="detail-description">A considered retreat for slower days in {stay.city}. Settle into a stay with a strong sense of place, thoughtful details, and room to make the time your own.</p>
          <div className="detail-amenities"><span>Quiet setting</span><span>Entire place</span><span>Flexible arrival</span></div>
          {isReservationFormOpen ? <form className="reservation-form" onSubmit={handleReservationSubmit}>
            <div className="reservation-heading"><p className="eyebrow">Make it yours</p><h2>Reserve your stay</h2></div>
            <div className="reservation-fields"><label>Full name<input name="name" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label><label>Check in<input name="checkIn" type="date" required /></label><label>Check out<input name="checkOut" type="date" required /></label><label>Guests<select name="guests" defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></label></div>
            <div className="reservation-actions"><button className="reservation-cancel" type="button" onClick={() => setIsReservationFormOpen(false)}>Cancel</button><button className="auth-submit" type="submit">Confirm reservation <span>↗</span></button></div>
          </form> : <div className="detail-booking"><p><strong>${stay.pricePerNight}</strong> night</p><button type="button" onClick={() => setIsReservationFormOpen(true)}>Reserve this stay <span>↗</span></button></div>}
        </div>
      </div>
      <div className="detail-map-section">
        <div>
          <p className="eyebrow">Find your way there</p>
          <h2>Location</h2>
          <p>{stay.city}, {stay.country}</p>
        </div>
        <div className="detail-map-shell">
          <MapContainer center={position} zoom={9} scrollWheelZoom className="detail-map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>{stay.title}<br />{stay.city}, {stay.country}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      {isReservationSubmitted && <div className="reservation-overlay" role="presentation"><div className="reservation-success" role="dialog" aria-modal="true" aria-labelledby="reservation-success-title"><button className="reservation-close" type="button" onClick={closeReservation} aria-label="Close reservation confirmation">×</button><span className="success-mark">✓</span><p className="eyebrow">Reservation confirmed</p><h2 id="reservation-success-title">Your stay is waiting.</h2><p>Your reservation request for <strong>{stay.title}</strong> in {stay.city} has been received. We have sent the details to your email.</p><button className="auth-submit" type="button" onClick={closeReservation}>Done <span>↗</span></button></div></div>}
    </section>
  )
}

export default ListingDetail
