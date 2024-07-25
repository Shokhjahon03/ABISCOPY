import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";

export default function ReportIndex() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/analytics/report/waterwork`);
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
}
