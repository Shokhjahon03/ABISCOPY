import React from "react";
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const SalesForecastCharts = ({ dataColors }) => {
  const areachartSalesColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      type: "bar",
      height: 341,
      toolbar: {
        show: true,
      },
    },
    colors: areachartSalesColors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },

    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    xaxis: {
      labels: {
        style: {
          colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      tickAmount: 4,
      min: 0,
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <React.Fragment>
      {/* <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="bar"
        height="341"
        className="apex-charts"
      /> */}
    </React.Fragment>
  );
};
const WaterworkChart2 = ({
  dataColors,
  series,
  yaxisTitle,
  xaxisCategories,
}) => {
  const areachartSalesColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      type: "bar",
      height: 341,
      toolbar: {
        show: true,
      },
    },
    colors: areachartSalesColors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },

    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xaxisCategories,
      labels: {
        style: {
          colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: yaxisTitle,
      },
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      tickAmount: 4,
      min: 0,
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="bar"
        height="341"
        className="apex-charts"
      />
    </React.Fragment>
  );
};
const WaterworkChart = ({
  dataColors,
  series,
  yaxisTitle,
  xaxisCategories,
}) => {
  var chartColumnDistributedColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {},
      },
    },
    colors: chartColumnDistributedColors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: xaxisCategories,
      labels: {
        style: {
          colors: [
            "#038edc",
            "#51d28c",
            "#f7cc53",
            "#f34e4e",
            "#564ab1",
            "#5fd0f3",
          ],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: yaxisTitle,
      },
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      tickAmount: 4,
      min: 0,
    },
  };

  return (
    <ReactApexChart
      dir="ltr"
      className="apex-charts"
      series={series}
      options={options}
      type="bar"
      height={350}
    />
  );
};
const DealTypeCharts = ({ dataColors, series }) => {
  const dealTypeChartsColors = getChartColorsArray(dataColors);
  var options = {
    chart: {
      height: 341,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.2,
    },
    legend: {
      show: true,
      fontWeight: 500,
      offsetX: 0,
      offsetY: -8,
      markers: {
        width: 8,
        height: 8,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    markers: {
      size: 0,
    },
    colors: dealTypeChartsColors,
    xaxis: {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="radar"
        height="341"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const BalanceOverviewCharts = ({ dataColors, series }) => {
  const revenueExpensesChartsColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      height: 290,
      type: "area",
      // toolbar: "false",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      title: {
        text: "ценить",
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "ценить",
      },
      labels: {
        formatter: function (value) {
          return "$" + value + "k";
        },
      },
      tickAmount: 5,
      min: 0,
      max: 260,
    },
    colors: revenueExpensesChartsColors,
    fill: {
      opacity: 0.06,
      colors: revenueExpensesChartsColors,
      type: "solid",
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="area"
        height="290"
        className="apex-charts"
      />
    </React.Fragment>
  );
};
const DataBalabcer = ({ dataColors, series }) => {
  console.log(series);
  let datavertical = series?.map((e) => Math.round(e.value));
  let labelTitles = series?.map((e) => Math.round(e.station_number));
  let newarr = [
    {
      data: datavertical,
      name: "ценить",
    },
    {
      data: labelTitles,
      name: "номер станции",
    },
  ];
  console.log(newarr);
  const revenueExpensesChartsColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      height: 290,
      type: "area",
      // toolbar: "false",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      title: {
        text: "номер станции",
      },
      categories:
        labelTitles.length !== 0
          ? labelTitles
          : [40, 30, 50, 20, 70, 25, 30, 29, 45, 67],
    },
    yaxis: {
      title: {
        text: "ценить",
      },
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      tickAmount: 5,
      min: 0,
      max: 15000,
    },
    colors: revenueExpensesChartsColors,
    fill: {
      opacity: 0.06,
      colors: revenueExpensesChartsColors,
      type: "solid",
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={newarr}
        type="area"
        height="290"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export {
  SalesForecastCharts,
  DealTypeCharts,
  BalanceOverviewCharts,
  DataBalabcer,
  WaterworkChart,
  WaterworkChart2,
};
