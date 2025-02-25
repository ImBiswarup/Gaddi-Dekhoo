"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";

type Coordinates = { lat: number; lng: number };

export default function MainScreen() {
  const {
    distance,
    setDistance,
    setTotalAmount,
    carDetails,
  } = useAppContext();
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedLocationName, setSelectedLocationName] = useState<string>("");
  const [carDetailsLength, setCarDetailsLength] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }

    const defaultIcon = new L.Icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && searchQuery.length > 2) {
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        )
          .then((response) => response.json())
          .then((data) => setSuggestions(data))
          .catch((err) =>
            console.error("Error fetching suggestions:", err)
          );
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setSelectedLocation(e.latlng);
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              setSelectedLocationName(data.display_name);
            } else {
              setSelectedLocationName("Unknown Location");
            }
          })
          .catch((err) => {
            console.error("Error in reverse geocoding:", err);
            setSelectedLocationName("Unknown Location");
          });
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
            <Popup>{selectedLocationName || "Selected Location"}</Popup>
          </Marker>
        )}
      </>
    );
  }

  const toRad = (value: number) => (value * Math.PI) / 180;

  const calculateHaversineDistance = (
    pointA: Coordinates,
    pointB: Coordinates
  ) => {
    const R = 6370;
    const dLat = toRad(pointB.lat - pointA.lat);
    const dLng = toRad(pointB.lng - pointA.lng);
    const lat1 = toRad(pointA.lat);
    const lat2 = toRad(pointB.lat);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const computedDistance = R * c;
    setDistance(computedDistance);
  };

  useEffect(() => {
    if (location && selectedLocation) {
      calculateHaversineDistance(location, selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (carDetails.length > 0 && distance) {   
      const priceAmount = parseFloat(carDetails[0].cost);
      setTotalAmount(priceAmount * distance);
    }
  }, [carDetails, distance, setTotalAmount]);

  const handleSuggestionClick = (sug: any) => {
    const lat = parseFloat(sug.lat);
    const lon = parseFloat(sug.lon);
    setSelectedLocation({ lat, lng: lon });
    setSelectedLocationName(sug.display_name);
    setSearchQuery(sug.display_name);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <header className="w-full py-4 px-6 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Car Rental Booking</h1>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-white p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Available Rides
          </h2>
          <ul className="space-y-4">
            {carDetails.slice(0, carDetailsLength).map((item: any) => (
              <Link
                href={distance > 0.1 ? `/car/${item.name}` : `/`}
                key={item.name}
              >
                <li className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">Seats: {item.seats}</p>
                  </div>
                  <span className="text-lg font-semibold text-blue-600">
                    {item.cost}/km
                  </span>
                </li>
              </Link>
            ))}
          </ul>
          <div
            onClick={() => setCarDetailsLength(carDetailsLength + 5)}
            className={`mt-4 text-center cursor-pointer p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${carDetailsLength >= carDetails.length ? "hidden" : ""
              }`}
          >
            More Options
          </div>
        </div>

        <div className="md:w-1/2 bg-gray-100 flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Select Location
          </h2>

          <div className="w-full max-w-md mb-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a location"
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
              <ul className=" top-full left-0 right-0 text-black bg-white border border-gray-200 z-20 max-h-60 overflow-y-auto rounded-b-lg">
                {suggestions.map((sug: any) => (
                  <li
                    key={sug.place_id}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(sug)}
                  >
                    {sug.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {distance !== null && (
            <p className="text-lg font-medium text-blue-600 mb-4">
              Distance: {distance.toFixed(2)} km
            </p>
          )}

          <div className="w-full flex-1 rounded-lg overflow-hidden shadow-lg">
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

      <footer className="w-full py-4 bg-white shadow-inner text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Car Rental Booking. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
