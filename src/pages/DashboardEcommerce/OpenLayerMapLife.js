/** @format */
import { ScaleLine, Zoom, defaults as defaultControls } from "ol/control.js";

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
import Point from "ol/geom/Point";
import { fromLonLat, transform } from "ol/proj";
import { Style, Stroke, Icon } from "ol/style";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IconDron from "./data/icon.png";
import LayerGroup from "ol/layer/Group";
import XYZ from "ol/source/XYZ";
import { getmouse, getzoom } from "../../slices/controlled";
import { getdrone } from "../../slices/drone";
import { getdronAsync, setOpen } from "../../slices/dron";
import { LineString } from "ol/geom";
import marker from "../../assets/images/marker11.png";
import FollowIcon from "../../assets/images/followicon.svg";
import defaultIcon from "../../assets/icon/dron-red.svg";
import { getPointResolution, get as getProjection } from "ol/proj.js";
function OpenLayersMapLife({ dronePosition, layer, droneList }) {
  const zoom = useSelector((state) => state.controlled.zoom);
  const mouse = useSelector((state) => state.controlled.mouse);
  const dispatch = useDispatch();
  const dronline = useSelector((state) => state.dron.line);
  const open = useSelector((state) => state.dron.open);
  const [featuresArray, setfeaturesArray] = useState([]);
  const [drones, setDrones] = useState();
  const currentObject = useSelector((state) => state.object?.current);
  const mouseRef = useRef(null);
  const mapRef = useRef(null);
  const [oldLayer, setOldlayer] = useState(null);
  const [Osm, setOsm] = useState(null);
  const [map, setMap] = useState(null);
  const key = "5TC5CS4TxvBUIN9iGMmJ";
  const scaleControl = new ScaleLine({
    units: "metric",
    target: document.getElementById("zoomID"),
    bar: false,
    steps: 1,
    text: true,
    minWidth: 100,
    maxWidth: 140,
    className: 'bg-transparent w-25',
  });

  const layer1 = new TileLayer({
    source: new XYZ({
      url: `https://api.maptiler.com/maps/cadastre-satellite/{z}/{x}/{y}.png?key=${key}`,
    }),
    title: "cadastre-satellite",
    visible: localStorage.getItem("layer") == "cadastre-satellite",
  });
  const layer2 = new TileLayer({
    source: new XYZ({
      url:
        "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" + key,
    }),
    title: "satellite",
    visible: localStorage.getItem("layer") == "satellite",
  });
  let layerosm = new TileLayer({
    style: {
      contrast: 0.02,
    },
    source: new OSM(),
    type: "base",
    visible: localStorage.getItem("layer") == "layerosm",
    title: "layerosm",
  });
  let layerXYZ = new TileLayer({
    source: new XYZ({
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/" +
        "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    }),
    title: "layerxyz",
    visible: localStorage.getItem("layer") == "layerxyz",
  });
  const baseMaps = new LayerGroup({
    title: "Base maps",
    layers: [layerosm, layerXYZ, layer1, layer2],
  });
  const iconObject = new Style({
    image: new Icon({
      width: 50,
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: marker,
    }),
  });
  const DefaulticonDron = new Style({
    image: new Icon({
      // width: 50,
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      anchor: [0.5, 25],

      src: defaultIcon,
    }),
  });
  const FollowiconDron = new Style({
    image: new Icon({
      // width: 50,
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      anchor: [0.5, 25],
      src: FollowIcon,
    }),
  });
  const selectFolowIcon = (target) => {
    if (target) return FollowiconDron;
    else return DefaulticonDron;
  };
  const updateHandlemap = (featuresArr) => {
    if (map) {
      const vectorSource = new VectorSource({
        features: featuresArr,
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          switch (feature.get("name")) {
            case "Line":
              return new Style({
                stroke: new Stroke({ color: "red", width: 1 }),
              });
            case "dron":
              return selectFolowIcon(
                droneList?.find(
                  (item) => item.drone_id == dronePosition?.dron_id
                )?.target
              );
            case "object":
              return iconObject;
          }
        },
      });

      map.removeLayer(oldLayer);
      setOldlayer(vectorLayer);
      map.addLayer(vectorLayer);
      map.setView(
        new View({
          center: fromLonLat([
            currentObject?.longitude,
            currentObject?.latitude,
          ]),
          zoom: map.getView().getZoom(),
        })
      );
    }
  };
  useEffect(() => {
    const featuresArr = [
      new Feature({
        geometry: new Point(
          fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
        ),
        name: "dron",
        data: dronePosition,
      }),
      new Feature({
        geometry: new Point(
          fromLonLat([currentObject?.longitude, currentObject?.latitude])
        ),
        name: "object",
        data: dronePosition,
      }),
    ];
    updateHandlemap(featuresArr);
  }, [currentObject]);
  useEffect(() => {
    if (map) {
      baseMaps.getLayers().forEach((element, i) => {
        const elementTitle = element.get("title");
        element.setVisible(layer == elementTitle);
      });
      map.setLayers([baseMaps]);
    }
  }, [layer]);
  useEffect(() => {
    if (map) {
      var view = map.getView();
      var zooms = view.getZoom();
      if (Math.abs(zooms - zoom) > 1) {
        dispatch(getzoom(zooms + (zooms - zoom)));
      }
      view.setZoom(zoom);
      map.setView(view);

      //
    }
  }, [zoom]);
  useEffect(() => {
    if (dronline) {
      let lineCoordinates = dronline?.map((coord) => {
        if (coord.longitude == "0.0") return [69.325105, 41.3373566];
        else return [coord.longitude, coord.latitude];
      });
      const lineStrings = new LineString(
        (lineCoordinates || [])?.map((coord) => fromLonLat(coord))
      );
      setfeaturesArray((featuresArray) => [
        ...featuresArray,
        new Feature({ geometry: lineStrings, name: "Line" }),
      ]);

      const vectorSource = new VectorSource({
        features: [
          new Feature({ geometry: lineStrings, name: "Line" }),
          new Feature({
            geometry: new Point(
              fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
            ),
            name: "dron",
            data: dronePosition,
          }),
        ],
        lineStrings: lineStrings,
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          if (feature.get("name") === "Line") {
            return new Style({
              stroke: new Stroke({ color: "red", width: 3 }),
            });
          } else {
            return selectFolowIcon(
              droneList?.find((item) => item.drone_id == dronePosition?.dron_id)
                ?.target
            );
          }
        },
      });
      if (map) {
        map.removeLayer(oldLayer);
        setOldlayer(vectorLayer);
        map.addLayer(vectorLayer);
      }
    } else {
      const featuresArr = [
        new Feature({
          geometry: new Point(
            fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
          ),
          name: "dron",
          data: dronePosition,
        }),
        new Feature({
          geometry: new Point(
            fromLonLat([currentObject?.longitude, currentObject?.latitude])
          ),
          name: "object",
          data: dronePosition,
        }),
      ];
      const vectorSource = new VectorSource({
        features: featuresArr,
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          switch (feature.get("name")) {
            case "Line":
              return new Style({
                stroke: new Stroke({ color: "red", width: 1 }),
              });
            case "dron":
              return selectFolowIcon(
                droneList?.find(
                  (item) => item.drone_id == dronePosition?.dron_id
                )?.target
              );
            case "object":
              return iconObject;
          }
        },
      });
      if (map) {
        map.removeLayer(oldLayer);
        setOldlayer(vectorLayer);
        map.addLayer(vectorLayer);
      }
    }
    handleFeature();
  }, [dronePosition, dronline, droneList]);

  useEffect(() => {
    const osm = new OSM();
    scaleControl.setTarget(document.getElementById("zoomID"));
    setOsm(osm);
    const map = new Map({
      controls: [scaleControl],
      target: mapRef.current,
      layers: [baseMaps],
      view: new View({
        center: fromLonLat([69.240562, 41.311081]),
        zoom: zoom,
      }),
    });
    setMap(map);
    let featuresarr = new Feature({
      geometry: new Point(
        fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
      ),
      name: "dron",
      data: dronePosition,
    });
    const vectorSource = new VectorSource({
      features: [featuresarr],
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        if (feature.get("name") === "Line") {
          return new Style({
            stroke: new Stroke({ color: "red", width: 3 }),
          });
        } else {
          return selectFolowIcon(
            droneList?.find((item) => item.drone_id == dronePosition?.dron_id)
              ?.target
          );
        }
      },
    });
    setOldlayer(vectorLayer);
    map.addLayer(vectorLayer);
    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature && feature.get("name") == "dron") {
        dispatch(setOpen(true));

        dispatch(
          getdronAsync(`drone/filter?droneId=${feature.get("data")?.dron_id}`)
        );
      } else {
      }
    });
    map.on("moveend", function (evt) {
      const zoom = map.getView().getZoom();
      dispatch(getzoom(zoom));
    });
    return () => {
      map.dispose();
    };
  }, []);

  function handleFeature() {
    droneList?.forEach((item, i) => {
      if (item.drone_id == dronePosition?.dron_id) {
        let foundIndex = featuresArray?.findIndex(
          (x) => x.get("id") == dronePosition?.dron_id
        );
        if (foundIndex > 0) {
          let arr = featuresArray;
          arr[foundIndex] = new Feature({
            geometry: new Point(
              fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
            ),
            name: "dron",
            data: dronePosition,
            id: dronePosition?.dron_id,
          });
          setfeaturesArray(arr);
        } else
          setfeaturesArray((featuresArray) => [
            ...featuresArray,
            new Feature({
              geometry: new Point(
                fromLonLat([dronePosition?.longitude, dronePosition?.latitude])
              ),
              name: "dron",
              data: dronePosition,
              id: dronePosition?.dron_id,
            }),
          ]);
      }
    });
    setDrones();
  }

  if (map) {
    map.on("pointermove", function (evt) {
      let coord = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
      dispatch(getmouse(coord));
    });
  }
  return (
    <React.Fragment>
      <div className="top__card">
        <div id="zoomID" className="top_zoom_card text-white d-flex">
          Масштаб : 1 : 
        </div>
        <div className="top_zoom_card text-white">
          Координаты курсора: {mouse[0]?.toString().slice(0, 8)} {"  "} :{"  "}
          {mouse[1]?.toString().slice(0, 8)} <div id="mouse-position"></div>
        </div>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
      <div ref={mouseRef} />
    </React.Fragment>
  );
}

export default OpenLayersMapLife;
