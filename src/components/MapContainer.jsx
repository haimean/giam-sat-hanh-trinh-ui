/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../firebase.js";

const key = "AIzaSyAwJR7kylDCymhx59VKffi40Ez1qaU6aSo";
function MapContainer(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const query = ref(realtimeDB, "Location");
    return onValue(query, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setData(value);
      }
    });
  }, []);
  const mapStyles = {
    width: "100%",
    height: "50%",
  };

  return (
    <Map
      google={props.google}
      zoom={20}
      center={{
        lat: data?.Latitude ?? 21.008685,
        lng: data?.Longitude ?? 105.820781,
      }}
      style={mapStyles}
    >
      <Marker
        position={{
          lat: data?.Latitude ?? 21.008685,
          lng: data?.Longitude ?? 105.820781,
        }}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: key, // Replace with your Google Maps API Key
})(MapContainer);
