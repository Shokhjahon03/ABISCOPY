import { useEffect, useRef, useState } from "react";

const FlowScenarios = () => {
  let [damValue, setdamValue] = useState({
    y1: 250,
    y2: 60,
    y3: 60,
    y4: 70,
    y5: 70,
    y6: 250,
  });
  let [watherHightValue, setWatherHightValue] = useState({
    y1: 87,
    y2: 160,
    y3: 200,
    y4: 242,
    y5: 242,
    y6: 200,
    y7: 160,
    y8: 87,
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <button
            onClick={() => {
              setWatherHightValue({
                y1: watherHightValue.y1 + 10,
                y2: watherHightValue.y2 + 10,
                y3: watherHightValue.y3 + 10,
                y4: watherHightValue.y4 + 10,
                y5: watherHightValue.y5 + 10,
                y6: watherHightValue.y6 + 10,
                y7: watherHightValue.y7 + 10,
                y8: watherHightValue.y8 + 10,
              });
            }}
            type="button"
            class="btn btn-secondary waves-effect waves-light"
          >
            +
          </button>
          <button
            onClick={() => {
              setWatherHightValue({
                y1: watherHightValue.y1 - 10,
                y2: watherHightValue.y2 - 10,
                y3: watherHightValue.y3 - 10,
                y4: watherHightValue.y4 - 10,
                y5: watherHightValue.y5 - 10,
                y6: watherHightValue.y6 - 10,
                y7: watherHightValue.y7 - 10,
                y8: watherHightValue.y8 - 10,
              });
            }}
            type="button"
            class="btn btn-secondary waves-effect waves-light"
          >
            -
          </button>
        </div>
        <div>
          <svg height="480" width="560">
            <polyline
              points="200,87 130,192 80,192 22,87 "
              style={{ fill: "none", stroke: "black" }}
            />
            <text x="210" y="85" fill="red">
              600
            </text>
            <circle cx="200" cy="87" r="2" fill="red" />
            <circle cx="130" cy="192" r="2" fill="red" />
            <circle cx="80" cy="192" r="2" fill="red" />
            <circle cx="22" cy="87" r="2" fill="red" />
            <polyline
              points="220,97 150,202 100,202 42,97 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points="240,107 170,212 120,212 62,107 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points="260,117 190,222 140,222 82,117 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points="280,127 210,232 160,232 102,127 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points=" 300,137 230,242 180,242 122,137  "
              style={{ fill: "none", stroke: "black" }}
            />

            <polyline
              points="162,160 300,160 308,147 320,147 250,252 200,252 142,147 154,147 "
              style={{ fill: "grey", stroke: "none" }}
            />
            <polygon
              points={`172,${watherHightValue.y1} 300,${watherHightValue.y2} 300,${watherHightValue.y3} 380,${watherHightValue.y4} 270,${watherHightValue.y5} 210,${watherHightValue.y6} 202,${watherHightValue.y7} 82,${watherHightValue.y8} `}
              style={{ fill: "#65B5FC", stroke: "none", fillOpacity: "0.7" }}
            />
            <polyline
              points=" 340,157 270,262 220,262 162,157 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points=" 360,167 290,272 240,272 182,167 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points=" 380,177 310,282 260,282 202,177 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points=" 400,187 330,292 280,292 222,187 "
              style={{ fill: "none", stroke: "black" }}
            />
            <polyline
              points="420,197 350,302 300,302 242,197 "
              style={{ fill: "none", stroke: "black" }}
            />
            <text x="430" y="195" fill="red">
              800
            </text>
            <circle cx="420" cy="197" r="2" fill="red" />
            <circle cx="350" cy="302" r="2" fill="red" />
            <circle cx="300" cy="302" r="2" fill="red" />
            <circle cx="242" cy="197" r="2" fill="red" />
          </svg>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          Gates
          <button
            type="button"
            class="btn btn-secondary waves-effect waves-light"
          >
            +
          </button>
          <button
            type="button"
            class="btn btn-secondary waves-effect waves-light"
          >
            -
          </button>
        </div>
        <svg height="480" width="560">
          <polyline
            points="9,0 10,290"
            style={{ fill: "none", stroke: "black" }}
          />
          <text x="0" y="10" fill="red">
            x
          </text>
          <polyline
            points="10,290 490,290"
            style={{ fill: "none", stroke: "black" }}
          />
          <text x="490" y="290" fill="red">
            y
          </text>
          <polyline
            points="350,60 260,272 100,272 10,60 "
            style={{ fill: "none", stroke: "black" }}
          />
          <polygon
            points="250,60 250,90 337,90 260,272 100,272 10,60 "
            style={{ fill: "#ACACAE", stroke: "black" }}
          />
          <polygon
            points="308,160 260,272 100,272 53,160 "
            style={{ fill: "none", stroke: "black" }}
          />

          <rect
            width="20"
            height="120"
            x="90"
            y="80"
            style={{
              fill: "#22223b",
              stroke: "black",
              strokewidth: "5",
              fillopacity: "0.1",
              strokeopacity: "0.9",
            }}
          />
          <rect
            width="20"
            height="120"
            x="120"
            y="80"
            style={{
              fill: "#22223b",
              stroke: "black",
              strokewidth: "5",
              fillopacity: "0.1",
              strokeopacity: "0.9",
            }}
          />
          <rect
            width="20"
            height="120"
            x="150"
            y="80"
            style={{
              fill: "#22223b",
              stroke: "black",
              strokewidth: "5",
              fillopacity: "0.1",
              strokeopacity: "0.9",
            }}
          />
          <rect
            width="20"
            height="120"
            x="180"
            y="80"
            style={{
              fill: "#22223b",
              stroke: "black",
              strokewidth: "5",
              fillopacity: "0.1",
              strokeopacity: "0.9",
            }}
          />
          <rect
            width="20"
            height="80"
            x="265"
            y="100"
            style={{
              fill: "#22223b",
              stroke: "black",
              strokewidth: "5",
              fillopacity: "0.1",
              strokeopacity: "0.9",
            }}
          />

          <circle cx="350" cy="60" r="2" fill="red" />
          <circle cx="260" cy="272" r="2" fill="red" />
          <circle cx="100" cy="272" r="2" fill="red" />
          <circle cx="10" cy="60" r="2" fill="red" />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <button
            type="button"
            class="btn btn-primary waves-effect waves-light"
            onClick={() => {
              setdamValue({
                y1: damValue.y1 - 10,
                y2: damValue.y2 - 10,
                y3: damValue.y3 - 10,
                y4: damValue.y4 - 10,
                y5: damValue.y5 - 10,
                y6: damValue.y6 - 10,
              });
            }}
          >
            +
          </button>
          <button
            type="button"
            class="btn btn-secondary waves-effect waves-light"
            onClick={() => {
              setdamValue({
                y1: damValue.y1 + 10,
                y2: damValue.y2 + 10,
                y3: damValue.y3 + 10,
                y4: damValue.y4 + 10,
                y5: damValue.y5 + 10,
                y6: damValue.y6 + 10,
              });
            }}
          >
            -
          </button>
        </div>
        <svg height="480" width="760">
          <polygon
            points="440,350 440,400 320,400 320,350"
            style={{ fill: "#ACACAE", stroke: "black" }}
          />
          <polygon
            points={`280,${damValue.y1} 400,${damValue.y2}  650,${damValue.y3} 650,400 420,400 400,${damValue.y4} 395,${damValue.y5} 340,400 0,400 0,${damValue.y6}`}
            style={{ fill: "#6CB9FC", stroke: "black" }}
          />
          <polygon
            points="400,70 400,120  390,120 390,70"
            style={{ fill: "#4F5153", stroke: "black" }}
          />
        </svg>
      </div>
      <svg
        width="200"
        height="100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="20"
          width="180"
          height="60"
          fill="gray"
          stroke="black"
          stroke-width="1"
        />

        <rect
          x="30"
          y="30"
          width="140"
          height="40"
          fill="white"
          stroke="black"
          stroke-width="1"
        />

        <line x1="0" y1="10" x2="0" y2="90" stroke="black" stroke-width="2" />
        <circle cx="0" cy="10" r="3" fill="red" />
        <circle cx="0" cy="90" r="3" fill="black" />

        <line
          x1="100"
          y1="10"
          x2="100"
          y2="90"
          stroke="black"
          stroke-width="2"
        />
        <circle cx="100" cy="10" r="3" fill="red" />
        <circle cx="100" cy="90" r="3" fill="black" />

        <line
          x1="200"
          y1="10"
          x2="200"
          y2="90"
          stroke="black"
          stroke-width="2"
        />
        <circle cx="200" cy="10" r="3" fill="red" />
        <circle cx="200" cy="90" r="3" fill="black" />
      </svg>
    </>
  );
};

export default FlowScenarios;
