import { useEffect, useState } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "./firebase.js";

function App() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const query = ref(realtimeDB, "Location");
    return onValue(query, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setDatas((prevDatas) => [value, ...prevDatas]);
      }
    });
  }, []);

  const getDate = (date) => {
    const value = date.toString();
    return (
      value.slice(0, 2) + "/" + value.slice(2, 4) + "/20" + value.slice(4, 6)
    );
  };
  const getTime = (date) => {
    const value = date.toString();
    return (
      value.slice(0, 2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6)
    );
  };
  return (
    <div className="App">
      <header>
        <h2>Giám sát hành trình</h2>
      </header>
      <div
        style={{
          display: "block",
          height: "229px",
          overflowY: "scroll",
        }}
      >
        <table>
          <tr>
            <th>Ngày</th>
            <th>Thời gian</th>
            <th>Kinh Độ</th>
            <th>Vĩ Độ</th>
            <th>Vận tốc</th>
          </tr>
          {datas.map((data) => (
            <tr>
              <td>{getDate(data.date)}</td>
              <td>{getTime(data.Time)}</td>
              <td>{data.Latitude}</td>
              <td>{data.Longitude}</td>
              <td>{data.Speed}km/h</td>
            </tr>
          ))}
        </table>
      </div>
      <MapContainer data={datas[0]} style={{ height: "50%", width: "50%" }} />
    </div>
  );
}

export default App;
