import { useEffect, useState } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "./firebase.js";

function App() {
  const [datas, setDatas] = useState([]);
  const [dataMarker, setDataMarker] = useState([]);
  const [idSelect, setIdSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const query = ref(realtimeDB);
    return onValue(query, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const data = Object.values(value).reverse();
        console.log("data", data);
        setDatas(data);
        if (check) {
          setDataMarker([data[0]]);
          setIdSelect(datas[0].id);
        }
      }
    });
  }, []);

  const onClickRow = (id) => {
    setDateSelect("");
    if (id !== idSelect) {
      setCheck(false);
      setIdSelect(id);
      const markers = datas.filter((item) => item.id === id);
      setDataMarker(markers);
    } else {
      setCheck(true);
      setIdSelect("");
      setDataMarker([datas[0]]);
      setIdSelect(datas[0].id);
    }
  };
  const onClickRowDate = (data) => {
    setIdSelect("");
    if (data.date !== dateSelect) {
      setCheck(false);
      setDateSelect(data.date);
      const markers = datas.filter((item) => item.date === data.date);
      setDataMarker(markers);
    } else {
      setCheck(true);
      setDateSelect("");
      setDataMarker([datas[0]]);
      setIdSelect(datas[0].id);
    }

    //setmarker
  };

  const onClickCheck = () => {
    setIdSelect(datas[0].id);
    console.log("datas[0].id", datas[0].id);
    setDataMarker([datas[0]]);
    setDateSelect("");
    setCheck((pre) => !pre);
  };
  return (
    <div className="App">
      <header
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px",
        }}
      >
        <h2>Giám sát hành trình</h2>
        <button type="button" hidden={check} onClick={onClickCheck}>
          <h4>{check ? "Đang ở vị trí hiện tại" : "Về vị trí hiện tại"}</h4>
        </button>
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
            <tr
              key={data.id}
              style={{
                backgroundColor:
                  idSelect === data.id || dateSelect === data.date
                    ? "#5dbcf6"
                    : "white",
              }}
            >
              <td
                onClick={() => {
                  onClickRowDate(data);
                }}
              >
                {data.date}
              </td>
              <td
                onClick={() => {
                  onClickRow(data.id);
                }}
              >
                {data.Time}
              </td>
              <td
                onClick={() => {
                  onClickRow(data.id);
                }}
              >
                {data.Latitude}
              </td>
              <td
                onClick={() => {
                  onClickRow(data.id);
                }}
              >
                {data.Longitude}
              </td>
              <td
                onClick={() => {
                  onClickRow(data.id);
                }}
              >
                {data.Speed}km/h
              </td>
            </tr>
          ))}
        </table>
      </div>
      <MapContainer
        style={{ height: "50%", width: "50%" }}
        dataMarker={dataMarker}
      />
    </div>
  );
}

export default App;
