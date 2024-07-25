import React from "react";
import { Line } from "react-chartjs-2";

import getChartColorsArray from "./ChartsDynamicColor";

const ExampleChart = ({ dataColors, elevation }) => {
  var lineChartColor = getChartColorsArray(dataColors);
  const data = {
    labels: ["", "", ""],
    datasets: [
      {
        label: "Ground level",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#D6FFF6",
        borderColor: lineChartColor[3],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[3],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[1],
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [250, 30, 250],
        stepSize: 1,
      },
      {
        label: `WS PF 1 | ${
          elevation.ws_elevation1 ? elevation.ws_elevation1 : "..."
        } [m]`,
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "rgba(255, 255, 255, 0.985)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.ws_elevation1,
              elevation.ws_elevation1,
              elevation.ws_elevation1,
            ]
          : [0, 0, 0],
      },
      {
        label: `EG PF 1 | ${
          elevation.eg_elevation1 ? elevation.eg_elevation1 : "..."
        } [m]`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "yellow",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.eg_elevation1,
              elevation.eg_elevation1,
              elevation.eg_elevation1,
            ]
          : [0, 0, 0],
      },
      {
        label: `WS PF 2 | ${
          elevation.ws_elevation2 ? elevation.ws_elevation2 : "..."
        } [m]`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "black",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.ws_elevation2,
              elevation.ws_elevation2,
              elevation.ws_elevation2,
            ]
          : [0, 0, 0],
      },
      {
        label: `EG PF 2 | ${
          elevation.eg_elevation2 ? elevation.eg_elevation2 : "..."
        } [m]`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "yellow",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.eg_elevation2,
              elevation.eg_elevation2,
              elevation.eg_elevation2,
            ]
          : [0, 0, 0],
      },
      {
        label: `WS PF 3 | ${
          elevation.ws_elevation3 ? elevation.ws_elevation3 : "..."
        } [m]`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "black",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.ws_elevation3,
              elevation.ws_elevation3,
              elevation.ws_elevation3,
            ]
          : [0, 0, 0],
      },
      {
        label: `EG PF 3 | ${
          elevation.eg_elevation3 ? elevation.eg_elevation3 : "..."
        } [m]`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(36, 126, 244)",
        borderColor: "yellow",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[1],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[3],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: elevation.ws_elevation1
          ? [
              elevation.eg_elevation3,
              elevation.eg_elevation3,
              elevation.eg_elevation3,
            ]
          : [0, 0, 0],
      },
    ],
  };
  const option = {
    // scales: {
    //   y: {
    //     max: 5,
    //     min: 0,
    //     ticks: {
    //       stepSize: 5,
    //     },
    //   },
    // },
    x: {
      ticks: {
        font: {
          family: "Poppins",
        },
      },
    },
    y: {
      ticks: {
        stepSize: 5,
        font: {
          family: "Poppins",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            family: "Poppins",
          },
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Line width={400} height={220} data={data} options={option} />
    </React.Fragment>
  );
};

export { ExampleChart };
