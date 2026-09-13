import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { Stay } from './App'
import { cityCoordinates, markerIcon } from './mapData'
import './MapView.css'

type MapViewProps = {
  stays: Stay[]
}

function MapViewport({ stays }: MapViewProps) {
  const map = useMap()

  useEffect(() => {
    if (stays.length === 1) {
      const position = cityCoordinates[stays[0].city]
      if (position) map.setView(position, 8)
    }
  }, [map, stays])

  return null
}

function MapView({ stays }: MapViewProps) {
  return (
    <div className="map-shell">
      <MapContainer center={[22.5, 79]} zoom={4.8} scrollWheelZoom className="listing-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport stays={stays} />
        {stays.map((stay) => {
          const position = cityCoordinates[stay.city]
          if (!position) return null

          return (
            <Marker position={position} icon={markerIcon} key={stay.id}>
              <Popup>
                <strong>{stay.title}</strong>
                <br />
                {stay.city}, {stay.country}
                <br />
                ${stay.pricePerNight} night
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
      <div className="map-caption">{stays.length} stays on the map</div>
    </div>
  )
}

export default MapView
