import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Stroke, Icon } from "ol/style";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { gettrackerAsync } from "../../slices/tracker";
import { point } from "leaflet";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";

function OpenLayers({ latitude, longitude, lineCoordinates }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dronePosition, setDronePosition] = useState([]);
  useEffect(() => {
    dispatch(gettrackerAsync("tracker-data"));
  });

  const mapRef = useRef(null);
  const handleChange = (e) => {
    setSearchParams({ type: e });
  };
  function initSocket() {
    const socket = new WebSocket("ws://127.0.0.1:8000");
    socket.addEventListener("message", (event) => {
      let response = JSON.parse(event.data);
      console.log(response?.longitude);
      console.log("Message from server ", JSON.parse(event.data));
      console.log(JSON.parse(event.data)["longitude"]);
      setDronePosition([
        ...dronePosition,
        [
          JSON.parse(event.data)["longitude"],
          JSON.parse(event.data)["latitude"],
        ],
      ]);
    });

    socket.addEventListener("close", (event) => {
      console.log("Connection closed, reconnecting: ", event.data);
      initSocket();
    });
  }

  useEffect(() => {
    initSocket();

    let featuresarr = dronePosition?.map((cord) => {
      return new Feature({
        geometry: new Point(fromLonLat(cord)),
      });
    });
    // featuresarr.push(new Feature({
    //   geometry: new Point(fromLonLat([longitude, latitude])),
    // }));

    //featuresarr.push(new Feature({ geometry: lineStrings, name: "Line" }));
    const vectorSource = new VectorSource({
      features: featuresarr,
      //lineStrings: lineStrings,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        if (feature.get("name") === "Line") {
          return new Style({
            stroke: new Stroke({ color: "red", width: 3 }),
          });
        } else {
          return new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
            }),
          });
        }
      },
    });

    const map = new Map({
      target: mapRef.current,
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 18,
      }),
    });

    return () => {
      map.dispose();
    };
  }, [latitude, longitude, lineCoordinates, dronePosition]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "800px" }}>
      <div className="myMap">
        <Button
          color={searchParams.get("type") == "life" ? "success" : "light"}
          className="me-2"
          onClick={() => handleChange("life")}
        >
          <i className="bx bx-navigation"></i>
        </Button>
        <Button
          color={searchParams.get("type") == "story" ? "success" : "light"}
          onClick={() => handleChange("story")}
        >
          <i className="bx bx-trending-up"></i>
        </Button>
      </div>
    </div>
  );
}

export default OpenLayers;
