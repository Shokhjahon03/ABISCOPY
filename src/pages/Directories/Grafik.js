import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { BarChart, LineChart, PieChart } from "../Charts/ChartsJs/ChartsJs";
import { useSortBy } from "react-table";
import axios from "axios";
import { token } from "../../token";
import BASE_URL from "../../config";
import eye from "../../assets/icon/🦆eye_.svg";
import { LineChartDistance } from "../Charts/ChartsJs/ChartDictanse";
import BalanceOverview from "../DashboardCrm/BalanceOverview";
import DataBalanceChart from "../DashboardCrm/DataBalanceChart";
import { useTranslation } from "react-i18next";
import { ExampleChart } from "../../Components/Common/ExaamChart";
// import { t } from "i18next";
const Grafik = () => {
  let [profile, setProfile] = useState([]);
  let [reach, setReach] = useState([]);
  let [rivers, setRivers] = useState([]);
  let [hecras, setHecras] = useState([]);
  let [optionData, setOptionData] = useState([]);
  let [optionsDorV, setOptionsDorV] = useState("nomer");
  let [optionGetValue, setOptionGetValue] = useState({
    riverId: 0,
    reachId: 0,
    profileId: 0,
    nVarId: 0,
  });

  let newArray = hecras.filter((e) => e.code === Number(optionGetValue.nVarId));

  let GetProfileDatas = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "hecras/profile/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProfile(res);
    } catch (error) {
      console.log(error);
    }
  };
  let GetReachData = async (id) => {
    try {
      let res = await axios.get(
        BASE_URL.api.BASE_URL + `hecras/reach/?river_id=${id ? id : 0}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (id > 0) {
        setReach(res);
      } else {
        setReach([]);
      }
    } catch (error) {
      setReach([]);
      console.log(error);
    }
  };

  let GetRiversData = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "hecras/river/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRivers(res);
    } catch (error) {
      console.log(error);
    }
  };

  let GetHecrasDatas = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "hecras/variable/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setHecras(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  let GetOutputDatas = async (ids) => {
    try {
      let res = await axios.get(
        BASE_URL.api.BASE_URL +
          `hecras/reach-output/?river_id=${ids.riverId}&reach_id=${ids.reachId}&profile_id=${ids.profileId}&nVar=${ids.nVarId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setOptionData(res);
      // setOptionData(res)
    } catch (error) {
      console.log(typeof ids.riverId);
      console.log(error);
    }
  };

  useEffect(() => {
    GetProfileDatas();
    GetReachData(optionGetValue.riverId);
    GetRiversData();
    GetHecrasDatas();
  }, []);

  let { t } = useTranslation();

  return (
    <div className="hecras">
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          overflowY: "scroll",
        }}
      >
        <Row>
          <Col xl={8} md={6}>
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 className="card-title mb-0">
                  {t("Hydrodynamic modeling")}
                </h4>
                <button
                  className="graficButton"
                  onClick={() => GetOutputDatas(optionGetValue)}
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    padding: "10px",
                    transition: "0.2s",
                  }}
                >
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={eye}
                    alt="alt"
                  />
                </button>
              </CardHeader>
              <CardBody>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* <p>.....</p> */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginBottom: "30px",
                    }}
                  >
                    <form
                      style={{
                        display: "flex",
                        width: "80%",
                        // justifyContent: "space-between",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <p>{t("River")}:</p>
                        <select
                          onClick={() => {
                            GetReachData(optionGetValue.riverId);
                          }}
                          className="sellection"
                          value={Number(optionGetValue.riverId)}
                          onChange={(e) => {
                            setOptionGetValue({
                              ...optionGetValue,
                              riverId: Number(e.target.value),
                            });
                          }}
                        >
                          <option value="">{t("Select River")}</option>
                          {rivers.map((e, i) => (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <p>{t("Plot")}:</p>
                        <select
                          className="sellection"
                          value={optionGetValue.reachId}
                          onChange={(e) =>
                            setOptionGetValue({
                              riverId: optionGetValue.riverId,
                              profileId: optionGetValue.profileId,
                              reachId: e.target.value,
                              nVarId: optionGetValue.nVarId,
                            })
                          }
                        >
                          <option value="">{t("Select Reach")}</option>

                          {reach.map((e, i) => (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div style={{}}>
                        <p>{t("Water flow profile")}:</p>
                        <select
                          className="sellection"
                          value={optionGetValue.profileId}
                          onChange={(e) =>
                            setOptionGetValue({
                              riverId: optionGetValue.riverId,
                              profileId: e.target.value,
                              reachId: optionGetValue.reachId,
                              nVarId: optionGetValue.nVarId,
                            })
                          }
                        >
                          <option>{t("Select Profile")}</option>

                          {profile.map((e, i) => (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <p>{t("Nvar")}:</p>
                        <select
                          className="sellection"
                          value={optionGetValue.nVarId}
                          onChange={(e) =>
                            setOptionGetValue({
                              riverId: optionGetValue.riverId,
                              profileId: optionGetValue.profileId,
                              reachId: optionGetValue.reachId,
                              nVarId: e.target.value,
                            })
                          }
                        >
                          <option>{t("Select nVar")}</option>

                          {hecras.map((e, i) => (
                            <option value={e.code} key={i}>
                              {e.description} , код-{e.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{
                            marginTop: "42px",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {t("View results by")}:
                        </p>
                        <form
                          style={{
                            display: "flex",
                            gap: "30px",
                            marginTop: "30px",
                          }}
                        >
                          <div>
                            <label
                              style={{ marginRight: "10px", cursor: "pointer" }}
                              for="distance"
                            >
                              {t("distance")}
                            </label>
                            <input
                              onChange={(e) => setOptionsDorV(e.target.value)}
                              style={{ marginTop: "5px", cursor: "pointer" }}
                              type="radio"
                              id="distance"
                              name="fav_language"
                              value="distance"
                            />
                          </div>

                          <div>
                            <label
                              style={{ marginRight: "10px", cursor: "pointer" }}
                              for="value"
                            >
                              {t("station numbers")}
                            </label>
                            <input
                              onChange={(e) => setOptionsDorV(e.target.value)}
                              style={{ marginTop: "5px", cursor: "pointer" }}
                              type="radio"
                              id="value"
                              name="fav_language"
                              value="nomer"
                            />
                          </div>
                        </form>
                      </div>
                    </form>
                  </div>
                </div>

                <LineChart
                  labelValue={
                    newArray[0]
                      ? newArray[0]
                      : { dedistance: "Зависит от nVar" }
                  }
                  chartTitle={optionGetValue.nVarId}
                  radioValu={optionsDorV}
                  datas={optionData.length > 0 ? optionData : []}
                  dataColors='["--vz-primary-rgb, 0.2", "--vz-primary", "--vz-success-rgb, 0.2", "--vz-success"]'
                />

                <p>
                  (x)-
                  {optionsDorV === "nomer"
                    ? t("station numbers along the horizontal axis")
                    : null}
                  {optionsDorV === "distance"
                    ? t("distance between stations along the horizontal axis")
                    : null}
                </p>
                <p>(y)-{t("station values ​​along the vertical axis")}</p>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="6">
            <Card style={{ height: "580px" }}>
              <CardHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "26px",
                }}
              >
                <h4 className="card-title mb-0">Симулатстя расстояние</h4>
              </CardHeader>
              <CardBody>
                <LineChartDistance
                  datas={optionData.length > 0 ? optionData : []}
                  dataColors='["--vz-primary-rgb, 0.2", "--vz-primary", "--vz-success-rgb, 0.2", "--vz-success"]'
                />
              </CardBody>
            </Card>
          </Col> */}
          {/* <DataBalanceChart
            dataChart={optionData.length > 0 ? optionData : []}
          /> */}
        </Row>
      </div>
    </div>
  );
};

export default Grafik;
