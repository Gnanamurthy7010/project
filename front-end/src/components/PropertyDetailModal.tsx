import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Mail, Calendar } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onAuthRequired,
}) => {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  if (!isOpen || !property) return null;

  const handleContact = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setShowContactSuccess(true);
    setTimeout(() => setShowContactSuccess(false), 3000);
  };

  const handleBook = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl animate-slideUp my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  ₹{property.price.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-4 ring-blue-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-lg">
                    {property.location.address}, {property.location.city}, {property.location.state}
                  </span>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Bed className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Bath className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Square className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-medium">{property.sqft} sqft</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Property Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 font-medium capitalize">{property.type === 'rental-house' ? 'Rental House' : property.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 font-medium capitalize text-green-600">{property.status}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Owner Information</h3>
                <p className="text-gray-700 font-medium">{property.ownerName}</p>
                <p className="text-gray-600 text-sm">{property.ownerEmail}</p>
              </div>

              {showContactSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm animate-slideDown">
                  Contact request sent successfully! The owner will reach out to you soon.
                </div>
              )}

              {showBookingSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm animate-slideDown">
                  Booking request submitted! We'll confirm your viewing appointment shortly.
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleContact}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Owner</span>
                </button>
                <button
                  onClick={handleBook}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Viewing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
