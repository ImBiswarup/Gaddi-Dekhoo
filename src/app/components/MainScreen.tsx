"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cars = [
  { id: 1, name: "Tesla Model 3", price: "$20", seats: 4 },
  { id: 2, name: "BMW X5", price: "$25", seats: 5 },
  { id: 3, name: "Mercedes-Benz E-Class", price: "$30", seats: 4 },
];

type Coordinates = { lat: number; lng: number };

export default function MainScreen() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }

    const defaultIcon = new L.Icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setSelectedLocation(e.latlng);
      },
    });
    return (
      <>
        {location && (
          <Marker position={location}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
      </>
    );
  }

  const toRad = (value: number) => (value * Math.PI) / 180;
  const calculateHaversineDistance = (pointA: Coordinates, pointB: Coordinates) => {
    const R = 6371;
    const dLat = toRad(pointB.lat - pointA.lat);
    const dLng = toRad(pointB.lng - pointA.lng);
    const lat1 = toRad(pointA.lat);
    const lat2 = toRad(pointB.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setDistance(distance);
  };

  useEffect(() => {
    if (location && selectedLocation) {
      calculateHaversineDistance(location, selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 bg-white shadow-md overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>
        <ul className="space-y-4">
          {cars.map((car) => (
            <li key={car.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{car.name}</h3>
                <p className="text-gray-500">Seats: {car.seats}</p>
              </div>
              <span className="text-lg font-semibold text-blue-600">{car.price}/km</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full h-screen flex flex-col items-center">
        <h1 className="text-2xl font-semibold p-4">Select Locations on the Map</h1>

        {distance !== null && (
          <p className="text-lg font-medium text-blue-600">Distance: {distance.toFixed(2)} km</p>
        )}

        <div className="w-full h-full">
          {location ? (
            <MapContainer center={location} zoom={13} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <LocationMarker />
            </MapContainer>
          ) : (
            <p className="text-center p-4">Fetching your location...</p>
          )}
        </div>
      </div>
    </div>
  );
}
