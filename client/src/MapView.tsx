import { divIcon } from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import type { Stay } from './App'
import './MapView.css'

type MapViewProps = {
  stays: Stay[]
}

export const cityCoordinates: Record<string, LatLngExpression> = {
  Alibag: [18.64, 72.87],
  Alleppey: [9.5, 76.33],
  Coonoor: [11.35, 76.8],
  Darjeeling: [27.04, 88.26],
  Goa: [15.49, 73.83],
  Jaipur: [26.91, 75.79],
  Kasauli: [30.9, 76.97],
  Manali: [32.24, 77.19],
  Munnar: [10.09, 77.06],
  Pondicherry: [11.94, 79.81],
  Rishikesh: [30.09, 78.27],
  Shimla: [31.1, 77.17],
}

export const markerIcon = divIcon({
  className: 'map-marker',
  html: '<span></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

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
