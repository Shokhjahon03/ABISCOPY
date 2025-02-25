// import React from "react";
// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   UncontrolledDropdown,
// } from "reactstrap";
// import Flatpickr from "react-flatpickr";
// import { DataService } from "../../../../helpers/dataService/dataService";
// import endpoints from "../../../../endpoints";
// import { useTranslation } from "react-i18next";
// import { months } from "../../../../common/data/month";
// import { Russian } from "flatpickr/dist/l10n/ru.js";
// import { WaterworkChart2 } from "../../../DashboardCrm/DashboardCrmCharts";
// import Loader from "../../../../Components/Common/Loader";
// import dateFormat from "dateformat";
// export default function Chart2() {
//   const { t } = useTranslation();
//   const yearsList = Array.from(
//     { length: new Date().getFullYear() - 2022 + 1 },
//     (_, index) => new Date().getFullYear() - index
//   );
//   const [seletedMonth, setSeletedMonth] = useState({
//     id: new Date().getMonth() + 1,
//     val: months.find((i) => i.id == new Date().getMonth() + 1).val,
//   });
//   const [seletedYear, setSeletedYear] = useState(new Date().getFullYear());
//   const [selectedStartYear, setSelectedStartYear] = useState(
//     new Date().getFullYear()
//   );
//   const [selectedEndYear, setSelectedEndYear] = useState(
//     new Date().getFullYear()
//   );
//   const [periodEnum, setPeriodEnum] = useState();
//   const [seletedPeriodEnum, setSeletedPeriodEnum] = useState();
//   const [parameterEnum, setParameterEnum] = useState();
//   const [selectedParameterEnum, setSelectedParameterEnum] = useState();
//   const [hydrotechnical, setHydrotechnical] = useState();
//   const [selectedHydrotechnical, setSelectedHydrotechnical] = useState();
//   const [channel, setChannel] = useState();
//   const [selectChannel, setSelectChannel] = useState();
//   const [waterworkData, setWaterworkData] = useState();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const fetchData = async () => {
//     const resPeriod = await DataService.get(endpoints.periodEnum);
//     setPeriodEnum(resPeriod);
//     setSeletedPeriodEnum(resPeriod[0]);
//     const resParameter = await DataService.get(endpoints.parameterEnum);
//     setParameterEnum(resParameter);
//     setSelectedParameterEnum(resParameter[0]);
//     const resHydrotechnical = await DataService.get(endpoints.hydrotechnical);
//     setHydrotechnical(resHydrotechnical);
//     setSelectedHydrotechnical(resHydrotechnical[0]);
//     const resChannel = await DataService.get(
//       endpoints.hydrotechnicalChannelByID(resHydrotechnical[0]?.id)
//     );
//     setChannel(resChannel);
//     setSelectChannel(resChannel[0]);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const changeHydrotechnic = async (id) => {
//     const resChannel = await DataService.get(
//       endpoints.hydrotechnicalChannelByID(id)
//     );
//     setChannel(resChannel);
//     setSelectChannel(resChannel[0]);
//   };
//   const fetchDataParams = async () => {
//     try {
//       const dataParams = {
//         parameter: selectedParameterEnum,
//         period: seletedPeriodEnum,
//         channel_id: selectChannel?.id,
//       };
//       if (seletedPeriodEnum == "DAILY") {
//         dataParams["date"] = dateFormat(currentDate, "yyyy-mm-dd");
//       }
//       if (seletedPeriodEnum == "MONTHLY") {
//         dataParams["month"] = seletedMonth.id;
//         dataParams["year"] = seletedYear;
//       }
//       if (seletedPeriodEnum == "YEARLY") {
//         dataParams["start_year"] = selectedStartYear;
//         dataParams["end_year"] = selectedEndYear;
//       }
//       const resWaterworkData = await DataService.get(
//         endpoints.dischargeDataDynamic,
//         {
//           ...dataParams,
//         }
//       );
//       setWaterworkData(resWaterworkData);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   useEffect(() => {
//     if (
//       selectedHydrotechnical &&
//       selectedParameterEnum &&
//       seletedPeriodEnum &&
//       selectChannel
//     )
//       fetchDataParams();
//   }, [
//     selectedHydrotechnical,
//     selectedParameterEnum,
//     seletedMonth,
//     seletedYear,
//     seletedPeriodEnum,
//     currentDate,
//     selectChannel,
//     selectedEndYear,
//     selectedStartYear,
//   ]);
//   return (
//     <Card>
//       <CardHeader className="gap-3 d-flex flex-column justify-content-start">
//         <h4 className="card-title mb-0 ">
//           Расход воды в каналах у гидроузлов в динамике
//         </h4>
//         <div className="d-flex gap-4 flex-wrap ">
//           {parameterEnum && (
//             <UncontrolledDropdown className="card-header-dropdown">
//               <DropdownToggle
//                 tag="a"
//                 className="text-reset dropdown-btn"
//                 role="button"
//               >
//                 <span className="fw-semibold text-uppercase fs-12 me-2">
//                   {t("Parameter_")}:
//                 </span>
//                 <span className="text-muted">
//                   {t(selectedParameterEnum)}
//                   <i className="mdi mdi-chevron-down ms-1"></i>
//                 </span>
//               </DropdownToggle>
//               <DropdownMenu className="dropdown-menu-start">
//                 {parameterEnum?.map((item, i) => (
//                   <DropdownItem
//                     key={i}
//                     onClick={() => {
//                       setSelectedParameterEnum(item);
//                     }}
//                     className={selectedParameterEnum === item ? "active" : ""}
//                   >
//                     {t(item)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           )}
//           {hydrotechnical && (
//             <UncontrolledDropdown className="card-header-dropdown">
//               <DropdownToggle
//                 tag="a"
//                 className="text-reset dropdown-btn"
//                 role="button"
//               >
//                 <span className="fw-semibold text-uppercase fs-12 me-2">
//                   {t("Hydrofoil_")}:
//                 </span>
//                 <span className="text-muted">
//                   {t(selectedHydrotechnical?.name)}
//                   <i className="mdi mdi-chevron-down ms-1"></i>
//                 </span>
//               </DropdownToggle>
//               <DropdownMenu
//                 className="dropdown-menu-start"
//                 style={{ maxHeight: 200, overflowY: "scroll" }}
//               >
//                 {hydrotechnical?.map((item, i) => (
//                   <DropdownItem
//                     key={i}
//                     onClick={() => {
//                       setSelectedHydrotechnical(item);
//                       changeHydrotechnic(item?.id);
//                     }}
//                     className={
//                       selectedHydrotechnical?.id === item?.id ? "active" : ""
//                     }
//                   >
//                     {t(item?.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           )}
//           {channel && (
//             <UncontrolledDropdown className="card-header-dropdown">
//               <DropdownToggle
//                 tag="a"
//                 className="text-reset dropdown-btn"
//                 role="button"
//               >
//                 <span className="fw-semibold text-uppercase fs-12 me-2">
//                   {t("Channel_")}:
//                 </span>
//                 <span className="text-muted">
//                   {t(selectChannel?.name)}
//                   <i className="mdi mdi-chevron-down ms-1"></i>
//                 </span>
//               </DropdownToggle>
//               <DropdownMenu
//                 className="dropdown-menu-start"
//                 style={{ maxHeight: 200, overflowY: "scroll" }}
//               >
//                 {channel?.map((item, i) => (
//                   <DropdownItem
//                     key={i}
//                     onClick={() => {
//                       setSelectChannel(item);
//                     }}
//                     className={selectChannel?.id === item?.id ? "active" : ""}
//                   >
//                     {t(item?.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           )}
//           {periodEnum && (
//             <UncontrolledDropdown className="card-header-dropdown">
//               <DropdownToggle
//                 tag="a"
//                 className="text-reset dropdown-btn"
//                 role="button"
//               >
//                 <span className="fw-semibold text-uppercase fs-12 me-2">
//                   {t("Frequency_")}:
//                 </span>
//                 <span className="text-muted">
//                   {t(seletedPeriodEnum)}
//                   <i className="mdi mdi-chevron-down ms-1"></i>
//                 </span>
//               </DropdownToggle>
//               <DropdownMenu className="dropdown-menu-start">
//                 {periodEnum?.map((item, i) => (
//                   <DropdownItem
//                     key={i}
//                     onClick={() => {
//                       setSeletedPeriodEnum(item);
//                     }}
//                     className={seletedPeriodEnum === item ? "active" : ""}
//                   >
//                     {t(item)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           )}
//           {seletedPeriodEnum == "MONTHLY" && (
//             <div className="d-flex gap-3">
//               <UncontrolledDropdown className="card-header-dropdown">
//                 <DropdownToggle
//                   tag="a"
//                   className="text-reset dropdown-btn"
//                   role="button"
//                 >
//                   <span className="fw-semibold text-uppercase fs-12 me-2">
//                     {t("month_")}:
//                   </span>
//                   <span className="text-muted">
//                     {t(seletedMonth?.val)}
//                     <i className="mdi mdi-chevron-down ms-1"></i>
//                   </span>
//                 </DropdownToggle>
//                 <DropdownMenu
//                   className="dropdown-menu-start "
//                   style={{ maxHeight: 200, overflowY: "scroll" }}
//                 >
//                   {months?.map((item, i) => (
//                     <DropdownItem
//                       key={i}
//                       onClick={() => {
//                         setSeletedMonth(item);
//                       }}
//                       className={seletedMonth?.id === item.id ? "active" : ""}
//                     >
//                       {t(item.val)}
//                     </DropdownItem>
//                   ))}
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//               <UncontrolledDropdown className="card-header-dropdown">
//                 <DropdownToggle
//                   tag="a"
//                   className="text-reset dropdown-btn"
//                   role="button"
//                 >
//                   <span className="fw-semibold text-uppercase fs-12 me-2">
//                     {t("year_")}:
//                   </span>
//                   <span className="text-muted">
//                     {seletedYear}
//                     <i className="mdi mdi-chevron-down ms-1"></i>
//                   </span>
//                 </DropdownToggle>
//                 <DropdownMenu
//                   className="dropdown-menu-start "
//                   style={{ maxHeight: 200, overflowY: "scroll" }}
//                 >
//                   {yearsList?.map((item, i) => (
//                     <DropdownItem
//                       key={i}
//                       onClick={() => {
//                         setSeletedYear(item);
//                       }}
//                       className={seletedYear === item ? "active" : ""}
//                     >
//                       {t(item)}
//                     </DropdownItem>
//                   ))}
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//             </div>
//           )}
//           {seletedPeriodEnum == "YEARLY" && (
//             <div className="d-flex gap-3">
//               <UncontrolledDropdown className="card-header-dropdown">
//                 <DropdownToggle
//                   tag="a"
//                   className="text-reset dropdown-btn"
//                   role="button"
//                 >
//                   <span className="fw-semibold text-uppercase fs-12 me-2">
//                     {t("start_year")}:
//                   </span>
//                   <span className="text-muted">
//                     {selectedStartYear}
//                     <i className="mdi mdi-chevron-down ms-1"></i>
//                   </span>
//                 </DropdownToggle>
//                 <DropdownMenu
//                   className="dropdown-menu-start "
//                   style={{ maxHeight: 200, overflowY: "scroll" }}
//                 >
//                   {yearsList?.map((item, i) => (
//                     <DropdownItem
//                       key={i}
//                       onClick={() => {
//                         setSelectedStartYear(item);
//                       }}
//                       className={selectedStartYear === item ? "active" : ""}
//                     >
//                       {t(item)}
//                     </DropdownItem>
//                   ))}
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//               <UncontrolledDropdown className="card-header-dropdown">
//                 <DropdownToggle
//                   tag="a"
//                   className="text-reset dropdown-btn"
//                   role="button"
//                 >
//                   <span className="fw-semibold text-uppercase fs-12 me-2">
//                     {t("end_year")}:
//                   </span>
//                   <span className="text-muted">
//                     {selectedEndYear}
//                     <i className="mdi mdi-chevron-down ms-1"></i>
//                   </span>
//                 </DropdownToggle>
//                 <DropdownMenu
//                   className="dropdown-menu-start "
//                   style={{ maxHeight: 200, overflowY: "scroll" }}
//                 >
//                   {yearsList?.map((item, i) => (
//                     <DropdownItem
//                       key={i}
//                       onClick={() => {
//                         setSelectedEndYear(item);
//                       }}
//                       className={selectedEndYear === item ? "active" : ""}
//                     >
//                       {t(item)}
//                     </DropdownItem>
//                   ))}
//                 </DropdownMenu>
//               </UncontrolledDropdown>
//             </div>
//           )}

//           {seletedPeriodEnum == "DAILY" && (
//             <div className="d-flex align-items-center  w-25">
//               <span className="fw-semibold text-uppercase fs-12 me-2">
//                 {t("day_")}:
//               </span>

//               <Flatpickr
//                 className="form-control border-0 p-0"
//                 options={{
//                   locale: Russian,
//                   dateFormat: "Y-m-d",
//                   defaultDate: new Date(),
//                 }}
//                 onChange={(date) => {
//                   setCurrentDate(date);
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       </CardHeader>
//       <div className="card-body pb-0">
//         {waterworkData ? (
//           <div id="sales-forecast-chart" className="apex-charts" dir="ltr">
//             <WaterworkChart2
//               series={[
//                 {
//                   data: waterworkData?.map((item) => {
//                     return item?.value;
//                   }),
//                 },
//               ]}
//               yaxisTitle={`${t(selectedParameterEnum)}`}
//               xaxisCategories={waterworkData?.map((item) => {
//                 if (
//                   seletedPeriodEnum == "YEARLY" &&
//                   selectedStartYear == selectedEndYear
//                 ) {
//                   return t(months[item?.key - 1]?.val);
//                 } else return item?.key;
//               })}
//               dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
//             />
//           </div>
//         ) : (
//           <Loader />
//         )}
//       </div>
//     </Card>
//   );
// }
