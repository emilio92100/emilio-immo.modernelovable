import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property, formatPrice } from "@/lib/properties";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface PropertiesMapProps {
  properties: Property[];
}

const PropertiesMap = ({ properties }: PropertiesMapProps) => {
  const geoProperties = useMemo(
    () => properties.filter((p) => p.latitude && p.longitude),
    [properties]
  );

  const center = useMemo<[number, number]>(() => {
    if (geoProperties.length === 0) return [48.8566, 2.3522]; // Paris
    const avgLat = geoProperties.reduce((s, p) => s + (p.latitude || 0), 0) / geoProperties.length;
    const avgLng = geoProperties.reduce((s, p) => s + (p.longitude || 0), 0) / geoProperties.length;
    return [avgLat, avgLng];
  }, [geoProperties]);

  if (geoProperties.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-secondary rounded border border-border">
        <p className="font-body text-muted-foreground text-sm">Aucun bien géolocalisé disponible.</p>
      </div>
    );
  }

  return (
    <div className="rounded overflow-hidden border border-border shadow-sm" style={{ height: 500 }}>
      <MapContainer center={center} zoom={12} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoProperties.map((p) => (
          <Marker key={p.id} position={[p.latitude!, p.longitude!]}>
            <Popup>
              <div className="min-w-[200px]">
                <img src={p.images[0]} alt={p.title} className="w-full h-24 object-cover rounded mb-2" />
                <p className="font-semibold text-sm mb-1">{p.title}</p>
                <p className="text-xs text-muted-foreground mb-1">{p.city}</p>
                <p className="font-semibold text-sm text-accent mb-2">{formatPrice(p.price)} FAI</p>
                <Link to={`/biens/${p.id}`} className="text-xs text-accent hover:underline">
                  Voir le détail →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertiesMap;
