import React, { useState } from "react";
import { GoogleMap, Marker } from "google-map-react";
import { autocomplete } from "react-places-autocomplete";

const Map = () => {
    const [address, setAddress] = useState("");
    const [latLng, setLatLng] = useState({
        lat: 37.775,
        lng: -122.418,
    });

    const handleChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the user's input address.
        const inputAddress = address.trim();

        // Use the Google Places API to get suggestions for the user's input.
        const suggestions = autocomplete(inputAddress);

        // Update the map's center and zoom level based on the user's selection.
        if (suggestions.length > 0) {
            const suggestion = suggestions[0];
            setLatLng({
                lat: suggestion.geometry.location.lat(),
                lng: suggestion.geometry.location.lng(),
            });
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter an address"
                value={address}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            <GoogleMap
                center={latLng}
                zoom={15}
                onMapClick={(e) => setLatLng(e.latLng)}
            >
                <Marker position={latLng} />
            </GoogleMap>
        </div>
    );
};

export default Map;
