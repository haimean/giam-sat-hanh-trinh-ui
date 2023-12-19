import { useEffect, useState } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "./firebase.js";

function App() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const query = ref(realtimeDB);
    return onValue(query, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setDatas(Object.values(value).reverse());
      }
    });
  }, []);

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
            <tr key={data.Time}>
              <td>{data.date}</td>
              <td>{data.Time}</td>
              <td>{data.Latitude}</td>
              <td>{data.Longitude}</td>
              <td>{data.Speed}km/h</td>
            </tr>
          ))}
        </table>
      </div>
      <MapContainer style={{ height: "50%", width: "50%" }} />
    </div>
  );
}

export default App;
