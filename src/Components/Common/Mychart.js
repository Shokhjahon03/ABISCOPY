import React from "react";

import { Line } from "react-chartjs-2";

export default function Mychart({ dataValues, watherT, stationAndelevation }) {
  let stations = stationAndelevation.map((e) => e.station);
  let elevations = stationAndelevation.map((e) => e.elevation);
  let is_bankPoint = stationAndelevation.filter((e) => e.is_bank === true);

  const data = {
    labels: stations,
    datasets: [
      {
        label: `Ground`,
        data: elevations,
        fill: true,
        backgroundColor: "white",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        pointBorderWidth: 0,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          if (is_bankPoint[0]) {
            if (value == is_bankPoint[0].elevation) return "red";
          }
          if (is_bankPoint[1]) {
            if (value == is_bankPoint[1].elevation) return "red";
          }
        },
      },
      {
        label: `WS PF 1`,
        data: stations.map(() => dataValues.ws_elevation1),
        fill: watherT === 1 ? true : false,
        backgroundColor: "#2FD6FC",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
      {
        label: "EG PF 1",
        data: stations.map(() => dataValues.eg_elevation1),
        fill: false,
        borderColor: "#742774",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
      {
        label: "WS PF 2",

        data: stations.map(() => dataValues.ws_elevation2),
        fill: watherT === 2 ? true : false,
        borderColor: "#2FD6FC",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
      {
        label: "EG PF 2",
        data: stations.map(() => dataValues.eg_elevation2),
        fill: false,
        borderColor: "black",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
      {
        label: "WS PF 3",
        data: stations.map(() => dataValues.ws_elevation3),
        fill: watherT === 3 ? true : false,
        borderColor: "#2FD6FC",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
      {
        label: "EG PF 3",
        data: stations.map(() => dataValues.eg_elevation3),
        segment: {
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        fill: false,
        borderColor: "black",
        borderWidth: 1,
        pointBorderWidth: 0,
      },
    ],
  };

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const options = {
    plugins: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
        pan: {
          // pan options and/or events
        },
        limits: {
          // axis limits
        },
        zoom: {
          // zoom options and/or events
        },
      },
    },
    elements: {
      point: {
        radius: 1.5,
      },
    },
    // events: ["click"],
    title: {
      display: true,
      text: "ABMK experiment Plan: Plan 01  07/06/2024",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 222,
            suggestedMax: 234,
            stepSize: 2,
          },
        },
      ],
    },
  };
  return (
    <div>
      <Line
        width={"800px"}
        height={"700px"}
        data={data}
        legend={legend}
        options={options}
      />
    </div>
  );
}
