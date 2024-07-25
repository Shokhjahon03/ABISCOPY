import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";

export default function DamIndex() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/dam/page1`);
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
}
