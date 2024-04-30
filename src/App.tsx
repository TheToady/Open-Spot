import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useState} from "react";
import {LatLng} from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState<LatLng>(new LatLng(51, 9))
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function App() {
  return (
    <div className="flex flex-col h-dvh w-dvw relative max-h-dvh">
      <MapContainer center={[51, 9]} zoom={6} scrollWheelZoom={true} >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div className="bg-purple-700/70 w-full h-10">
      </div>
    </div>
  )
}

export default App
