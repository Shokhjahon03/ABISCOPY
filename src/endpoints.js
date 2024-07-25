const endpoints = {
  ref: "/accounts/token/refresh/",
  login: "/accounts/token/",
  me: "/accounts/profile/",
  periodEnum: "/analytics/enum/period/",
  parameterEnum: "/analytics/enum/parameter/",
  hydrotechnical: "/analytics/hydrotechnical/",
  hydrotechnicalChannelByID: (id) => `/analytics/hydrotechnical/${id}/channel/`,
  dischargeData: "/analytics/discharge-data",
  qdParameter: "/analytics/enum/qd-parameter/",
  qualityData: "/analytics/quality-data",
  qualityDataDynamic: "/analytics/quality-data-dynamic",
  dischargeDataDynamic: "/analytics/discharge-data-dynamic",
};

export default endpoints;
