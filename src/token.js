import axios from "axios";
import endpoints from "./endpoints";

let _refToken = sessionStorage.getItem("RefToken");
let _token = sessionStorage.getItem("abisToken");
export let token = _token;

let _funcGetNewToken = async () => {
  await axios
    .post(endpoints.ref, { refresh: _refToken })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem("abisToken", res?.access);
      return res?.access;
    })
    .catch((err) => {
      console.log(err);
    });
};
setInterval(_funcGetNewToken(), 10800000);
