/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const key = "AIzaSyAwJR7kylDCymhx59VKffi40Ez1qaU6aSo";
function MapContainer(props) {
  const { dataMarker, google } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataMarker);
  }, [dataMarker]);
  const mapStyles = {
    width: "100%",
    height: "50%",
  };

  return (
    <Map
      google={google}
      zoom={18}
      center={{
        lat: data[0]?.Latitude ?? 21.008685,
        lng: data[0]?.Longitude ?? 105.820781,
      }}
      style={mapStyles}
    >
      {data.map((item, index) => (
        <Marker
          key={index}
          position={{
            lat: item?.Latitude ?? 21.008685,
            lng: item?.Longitude ?? 105.820781,
          }}
        />
      ))}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: key, // Replace with your Google Maps API Key
})(MapContainer);
