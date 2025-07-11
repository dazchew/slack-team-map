
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then(setMembers);
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {members.map((user) => (
        <Marker
          key={user.id}
          position={[user.lat, user.lng]}
          icon={L.icon({
            iconUrl: user.image,
            iconSize: [40, 40],
            className: "bobblehead-icon",
          })}
        >
          <Popup>
            <b>{user.name}</b><br />
            {user.city}<br />
            Local time: {user.time}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
