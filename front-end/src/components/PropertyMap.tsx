import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  onAuthRequired: () => void;
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  onPropertySelect,
  onAuthRequired,
}) => {
  const { isAuthenticated } = useAuth();
  const [center] = useState<[number, number]>([39.8283, -98.5795]);

  const handleContactClick = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onAuthRequired();
    } else {
      onPropertySelect(property);
    }
  };

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.lat, property.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-gray-900 mb-1">{property.title}</h3>
                <p className="text-blue-600 font-bold mb-2">
                  ₹{property.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {property.location.city}, {property.location.state}
                </p>
                <button
                  onClick={(e) => handleContactClick(property, e)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  {isAuthenticated ? 'View Details' : 'Login to Contact'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
