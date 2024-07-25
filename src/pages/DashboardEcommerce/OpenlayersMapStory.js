import React, { useEffect, useRef, useState } from "react";
import './map.css'
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
import { useDispatch } from "react-redux";
import { gettrackerAsync } from "../../slices/tracker";
import iconDron from './data/icon.png'
import { Button } from "reactstrap";
import { Link, useSearchParams } from "react-router-dom";


function OpenLayers({ latitude, longitude, lineCoordinates }) {
  const dispatch = useDispatch();
  const [dronePosition, setDronePosition] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(gettrackerAsync("tracker-data"));
  });

  const mapRef = useRef(null);

const handleChange=(e)=>{
  setSearchParams({type: e});
}


  useEffect(() => {
    const lineStrings = new LineString(
      (lineCoordinates || [])?.map((coord) => fromLonLat(coord))
    );
    let featuresarr = dronePosition?.map((cord) => {
      return new Feature({
        geometry: new Point(fromLonLat(cord)),
      });
    });
    featuresarr.push(new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    }));

    featuresarr.push(new Feature({ geometry: lineStrings, name: "Line" }));
    const vectorSource = new VectorSource({
      features: featuresarr,
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
          return new Style({
            image: new Icon({
              width: 30,
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: iconDron,
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

  return (<div ref={mapRef} style={{ width: "100%", height: "800px" }}>
     <div className="myMap">
      <Button color={searchParams.get('type')=='life'? 'success':"light"} className="me-2" onClick={()=>handleChange('life')}><i className="bx bx-navigation"></i></Button>
      <Button color={searchParams.get('type')=='story'? 'success':"light"} onClick={()=>handleChange('story')}><i className='bx bx-trending-up'></i></Button>
    </div>
  </div>)
}

export default OpenLayers;