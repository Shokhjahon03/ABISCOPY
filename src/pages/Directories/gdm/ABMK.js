import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../config";
import BlueZone from "../../../Components/Common/BlueZone";
import { token } from "../../../token";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { ExampleChart } from "../../../Components/Common/ExaamChart";
import Mychart from "../../../Components/Common/Mychart";
const ABMK = () => {
  let { t } = useTranslation();
  let [riverData, setRiverData] = useState([]);
  let [reachData, setReachData] = useState([]);
  let [elevationValues, setElevationValues] = useState("");
  let [stationlist, setStationList] = useState([]);
  let [modal, setEditModally] = useState(false);
  let [stationAndelevation, setStationAndelevation] = useState([]);
  let [station, setStation] = useState({
    river: "",
    reach: "",
    stationNUM: "",
  });
  let is_bankPoint = stationAndelevation.filter((e) => e.is_bank === true);
  // let [elevationBorderColor, setElevationBorderColor] = useState("");
  let [watherT, setWatherT] = useState(1);

  let getRiverDatas = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "hecras/river/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRiverData(res);
    } catch (error) {
      console.log(error);
    }
  };
  let getReachDatas = async (id_river) => {
    // let newArray = await riverData.filter((d) => d.name === id_river);
    try {
      let res = await axios.get(
        BASE_URL.api.BASE_URL +
          `hecras/reach/?river_id=${id_river ? id_river : 0}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (id_river > 0) {
        setReachData(res);
      } else {
        setReachData([]);
      }
    } catch (error) {
      setReachData([]);
      console.log(error);
    }
  };

  let getStationList = async (river, reach) => {
    // console.log(river, reach);
    // let riverId = await riverData.filter((d) => d.name === river);
    // let reachId = await reachData.filter((d) => d.name === reach);
    try {
      let res = await axios.get(
        BASE_URL.api.BASE_URL +
          `hecras/station-list/?river_id=${river ? river : 0}&reach_id=${
            reach ? reach : 0
          }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (river > 0 && reach > 0) {
        setStationList(res);
      } else {
        setStationList([]);
      }
    } catch (error) {
      setStationList([]);
      console.log(error);
    }
  };

  let getAnalisElevation = async (river, reach, station) => {
    let riverName = await riverData.filter((d) => d.id == river);
    let reachName = await reachData.filter((d) => d.id == reach);
    let statiomName = await stationlist.filter((e) => e.id == station);
    await axios
      .get(
        BASE_URL.api.BASE_URL +
          `hecras/profile-elevation/?river_id=${river}&reach_id=${reach}&station_id=${station}&station_name=${statiomName[0].station}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setElevationValues(response);
        // setEditModally(!modal);
      })
      .catch((err) => console.log(err));
    // .finally(() => setLoading(false))
    await axios
      .get(
        BASE_URL.api.BASE_URL +
          `hecras/cross-section/?river=${riverName[0].name}&reach=${reachName[0].name}&station=${statiomName[0].station}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setStationAndelevation(response);
        // setEditModally(!modal);
      })
      .catch((err) => console.log(err));
  };

  // let getdeElevation = async () => {
  //   // console.log(riverData[0].id);
  //   try {
  //     let res = await axios.get(
  //       BASE_URL.api.BASE_URL +
  //         `hecras/reach/?river_id=${riverData[0].id ? riverData[0].id : 0}`,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     console.log(res);
  //     let resStation = await axios.get(
  //       BASE_URL.api.BASE_URL +
  //         `hecras/station-list/?river_id=${
  //           riverData[0].id ? riverData[0].id : 0
  //         }&reach_id=${res[0].id ? res[0].id : 0}`,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     try {
  //       let resStationListOption = await axios.get(
  //         BASE_URL.api.BASE_URL +
  //           `hecras/cross-section/?river=${riverData[0].name}&reach=${res[0].name}&station=${resStation[0]}`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       setDefaultImgPath(resStationListOption.path);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getRiverDatas();
    getReachDatas();
    // getdeElevation();
    // getStationList();
  }, []);

  const customerstatus = [
    {
      options: riverData.map((e) => ({
        label: e.name,
        value: e.name,
      })),
    },
  ];
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          overflowY: "scroll",
          display: "flex",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div style={{}}>
          <h3 style={{ marginBottom: "50px" }}>{t("ABMK expriment")}</h3>
          <div style={{ width: "200px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <label>Select a river</label>
                <select
                  className="form-select"
                  onClick={() => {
                    getReachDatas(station.river);
                    // getStationList(station.river, station.reach);
                  }}
                  onChange={(e) =>
                    setStation({ ...station, river: e.target.value })
                  }
                  value={station.river.name}
                >
                  <option value={""}>select a river</option>
                  {riverData.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Select a reach</label>
                <select
                  value={station.reach}
                  className="form-select"
                  onChange={(e) =>
                    setStation({ ...station, reach: e.target.value })
                  }
                  onClick={() => getStationList(station.river, station.reach)}
                >
                  <option value="">select reach</option>
                  {reachData.map((r, i) => (
                    <option key={i} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Select a station</label>
                <select
                  value={station.stationNUM}
                  className="form-select"
                  onChange={(e) =>
                    setStation({ ...station, stationNUM: e.target.value })
                  }
                >
                  <option value="">select a station</option>
                  {stationlist.map((s, i) => (
                    <option key={i} value={s.id}>
                      {s.station}
                    </option>
                  ))}
                </select>
              </div>
              <button
                class="btn btn-soft-success waves-effect waves-light material-shadow-none"
                type="button"
                onClick={() =>
                  getAnalisElevation(
                    station.river,
                    station.reach,
                    station.stationNUM
                  )
                }
              >
                {t("viewing")}
              </button>
            </div>
            <div style={{ marginTop: "40px" }}>
              <p>Water filling settings up to WS</p>
              <button
                type="button"
                style={{ display: "flex", alignItems: "center" }}
                class="btn btn-soft-secondary waves-effect material-shadow-none"
                onClick={() => setWatherT(1)}
              >
                WS up to 1
                <i style={{ fontSize: "15px" }} class="bx bx-bx bx-filter"></i>
              </button>
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
                class="btn btn-soft-secondary waves-effect material-shadow-none"
                onClick={() => setWatherT(2)}
              >
                WS up to 2
                <i style={{ fontSize: "15px" }} class="bx bx-bx bx-filter"></i>
              </button>
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
                class="btn btn-soft-secondary waves-effect material-shadow-none"
                onClick={() => setWatherT(3)}
              >
                WS up to 3
                <i style={{ fontSize: "15px" }} class="bx bx-bx bx-filter"></i>
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p>Cross Section Cordinates : </p>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "20px" }}>Station (m)</th>
                <th style={{ padding: "20px" }}>Elevation (m)</th>
              </tr>
            </thead>
            <tbody>
              {stationAndelevation
                ? stationAndelevation.map((e, i) => (
                    <tr key={i}>
                      <td
                        style={
                          e.is_bank
                            ? { backgroundColor: "red", color: "white" }
                            : null
                        }
                      >
                        {e.station}
                      </td>
                      <td
                        style={
                          e.is_bank
                            ? { backgroundColor: "red", color: "white" }
                            : null
                        }
                      >
                        {e.elevation}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Banck Station
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "red",
                fontSize: "5px",
              }}
            ></div>
            [{is_bankPoint[0] && is_bankPoint[0].station}
            {is_bankPoint[0] && is_bankPoint[1].station}]
          </div>
        </div>
        <div
          style={{
            // marginTop: "100px",
            // padding: "120px",
            display: "flex",
            // gap: "20px",
            position: "relative",
          }}
        >
          <Mychart
            stationAndelevation={stationAndelevation}
            watherT={watherT}
            dataValues={elevationValues}
          />
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={() => {
          setEditModally();
        }}
        centered
        style={{ width: "600px" }}
      >
        <ModalHeader className="bg-light p-3">
          <Button
            type="button"
            onClick={() => {
              setEditModally(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>

        <ModalBody></ModalBody>
      </Modal>
    </div>
  );
};

export default ABMK;
