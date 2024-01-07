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
        setDatas(Object.values(value).reverse());
        if (check) {
          setDataMarker([datas[0]]);
        }
      }
    });
  }, []);

  const onClickRow = (id) => {
    setDateSelect("");
    if (id !== idSelect) {
      setCheck(false);
      setIdSelect(id);
      setDataMarker([datas[id]]);
    } else {
      setCheck(true);
      setIdSelect("");
      setDataMarker([datas[0]]);
    }

    //setmarker
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
    }

    //setmarker
  };

  const onClickCheck = () => {
    setDataMarker([datas[0]]);
    setDateSelect("");
    setIdSelect("");
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
          {datas.map((data, index) => (
            <tr
              key={data.Time}
              style={{
                backgroundColor:
                  idSelect === index || dateSelect === data.date
                    ? "azure"
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
                  onClickRow(index);
                }}
              >
                {data.Time}
              </td>
              <td
                onClick={() => {
                  onClickRow(index);
                }}
              >
                {data.Latitude}
              </td>
              <td
                onClick={() => {
                  onClickRow(index);
                }}
              >
                {data.Longitude}
              </td>
              <td
                onClick={() => {
                  onClickRow(index);
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
