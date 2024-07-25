// import React from "react";
// import {
//   Card,
//   CardHeader,
//   Col,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Row,
//   UncontrolledDropdown,
// } from "reactstrap";
// import {
//   WaterworkChart,
//   WaterworkChart2,
// } from "../../DashboardCrm/DashboardCrmCharts";
// import Chart1 from "./waterwork/Chart1";
// import Chart3 from "./waterwork/Chart3";
// import Chart2 from "./waterwork/Chart2";
// import Chart4 from "./waterwork/Chart4";

// export default function Waterwork() {
//   const chartData = [
//     { name: "АБМК", data: 124 },
//     { name: "Сброс 1", data: 84 },
//     { name: "Аму-Занг", data: 64 },
//     { name: "АБМК 2", data: 154 },
//   ];

//   const series = [
//     {
//       data: [21, 22, 10, 28],
//     },
//   ];
//   const chartData1 = [
//     { name: 1, data: 124 },
//     { name: 2, data: 84 },
//     { name: 3, data: 64 },
//     { name: 4, data: 154 },
//     { name: 5, data: 154 },
//     { name: 6, data: 154 },
//     { name: 7, data: 154 },
//     { name: 8, data: 154 },
//     { name: 9, data: 154 },
//     { name: 10, data: 154 },
//     { name: 11, data: 154 },
//     { name: 12, data: 154 },
//   ];

//   const series1 = [
//     {
//       data: [21, 22, 10, 28, 34, 55, 67, 8, 4, 22, 13, 66, 78, 66],
//     },
//   ];
//   const xaxisCategories = chartData.map((item) => {
//     return item.name;
//   });
//   const xaxisCategories1 = chartData1.map((item) => {
//     return item.name;
//   });

//   const onChangeChartPeriod = (pType) => {
//     setSeletedMonth(pType);
//   };

//   return (
//     <div>
//       <Row>
//         <Col md="6">
//           <Chart1 />
//         </Col>
//         <Col md="6">
//           <Chart2 />
//         </Col>
//       </Row>
//       <Row>
//         <Col md="6">
//           <Chart3 />
//         </Col>
//         <Col md="6">
//           <Chart4 />
//         </Col>
//       </Row>
//     </div>
//   );
// }
