import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AllOrders from "./AllOrders";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../../../slices/thunks";
// import {CryptoOrders} from "../../../common/data/cryptoPage";

const CryproOrder = () => {
  const dispatch = useDispatch();

  const { orderList } = useSelector((state) => ({
    orderList: state.Crypto.orderList,
  }));

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  document.title = "Orders | ABMC SCADA - Kibera Technology";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Orders" pageTitle="Crypto" />
          <Row>
            <AllOrders orderList={orderList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CryproOrder;
