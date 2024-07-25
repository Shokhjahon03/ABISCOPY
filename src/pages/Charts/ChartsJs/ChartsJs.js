import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut, Polar, Radar } from "react-chartjs-2";

import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";
import axios from "axios";

const LineChart = ({
  dataColors,
  datas,
  radioValu,
  chartTitle,
  labelValue,
}) => {
  let [x, setX] = useState([]);

  function checked() {
    if (radioValu === "distance") {
      return setX(datas?.map((e) => Math.round(e.distance)));
    } else if (radioValu === "value") {
      return setX(datas?.map((e) => Math.round(e.station_number)));
    } else {
      return setX(datas?.map((e) => Math.round(e.station_number)));
    }
  }
  useEffect(() => checked(), [radioValu, datas]);
  // let datavertical = datas?.map((e) => Math.round(e.value));
  // let datahorizontal = datas?.map((e) => Math.round(e.distance));
  let labelTitles = datas?.map((e) => Math.round(e.value));
  var lineChartColor = getChartColorsArray(dataColors);
  const data = {
    labels: x.length !== 0 ? x : [40, 30, 50, 20, 70, 25, 30, 29, 45, 67],
    datasets: [
      {
        label: labelValue.description,
        fill: true,
        lineTension: 0.5,
        backgroundColor: lineChartColor[0.8],
        borderColor: lineChartColor[1],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineChartColor[2],
        pointBackgroundColor: "#FE891D",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineChartColor[1],
        pointHoverBorderColor: radioValu === "value" ? "#FE891D" : "#CE2028",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: labelTitles,
      },
    ],
  };
  const option = {
    scales: {
      y: {
        yaxis: {
          title: {
            text: "Bytes Received",
          },
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return "$" + "bbbbb";
          },
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
      <Line width={803} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

//Bar Chart
const BarChart = ({ dataColors }) => {
  var barChartColor = getChartColorsArray(dataColors);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Analytics",
        backgroundColor: barChartColor[0],
        borderColor: barChartColor[0],
        borderWidth: 1,
        hoverBackgroundColor: barChartColor[1],
        hoverBorderColor: barChartColor[1],
        data: [65, 59, 81, 45, 56, 80, 50, 20],
      },
    ],
  };
  const option = {
    x: {
      ticks: {
        font: {
          family: "Poppins",
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: "Poppins",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins",
          },
        },
      },
    },
  };
  return (
    <React.Fragment>
      <Bar width={823} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

//Pie Chart
const PieChart = ({ dataColors }) => {
  var pieChartColors = getChartColorsArray(dataColors);
  const data = {
      labels: ["Desktops", "Tablets"],
      datasets: [
        {
          data: [300, 180],
          backgroundColor: pieChartColors,
          hoverBackgroundColor: pieChartColors,
          hoverBorderColor: "#fff",
        },
      ],
    },
    option = {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Poppins",
            },
          },
        },
      },
    };
  return (
    <React.Fragment>
      <Pie width={823} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

//Donut Chart
const DonutChart = ({ dataColors }) => {
  var doughnutChartColors = getChartColorsArray(dataColors);
  const data = {
      labels: ["Desktops", "Tablets"],
      datasets: [
        {
          data: [300, 210],
          backgroundColor: doughnutChartColors,
          hoverBackgroundColor: doughnutChartColors,
          hoverBorderColor: "#fff",
        },
      ],
    },
    option = {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Poppins",
            },
          },
        },
      },
    };
  return (
    <React.Fragment>
      <Doughnut width={723} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

//Polar Chart
const PolarChart = ({ dataColors }) => {
  var polarAreaChartColors = getChartColorsArray(dataColors);
  const data = {
    labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
    datasets: [
      {
        data: [11, 16, 7, 18],
        backgroundColor: polarAreaChartColors,
        label: "My dataset", // for legend
        hoverBorderColor: "#fff",
      },
    ],
  };
  const option = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins",
          },
        },
      },
    },
  };
  return (
    <React.Fragment>
      <Polar width={823} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

//Radar Chart
const RadarChart = ({ dataColors }) => {
  var radarChartColors = getChartColorsArray(dataColors);
  const data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "Desktops",
          backgroundColor: radarChartColors[0],
          borderColor: radarChartColors[1], //"#2ab57d",
          pointBackgroundColor: radarChartColors[1], //"#2ab57d",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: radarChartColors[1], //"#2ab57d",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "Tablets",
          backgroundColor: radarChartColors[2], //"rgba(81, 86, 190, 0.2)",
          borderColor: radarChartColors[3], //"#5156be",
          pointBackgroundColor: radarChartColors[3], //"#5156be",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: radarChartColors[3], //"#5156be",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    },
    option = {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Poppins",
            },
          },
        },
      },
    };
  return (
    <React.Fragment>
      <Radar width={723} height={320} data={data} options={option} />
    </React.Fragment>
  );
};

export { LineChart, BarChart, PieChart, DonutChart, PolarChart, RadarChart };
