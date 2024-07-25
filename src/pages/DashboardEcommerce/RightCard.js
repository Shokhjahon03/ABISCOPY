import React from "react";
import {
  Button,
  Card,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";
import "./map.css";
export default function RightCard() {
  return (
    <div className="">
      <div id="PopoverDismissible" className="cursor-pointer">
        <i className=" ri-stack-line text-white  fs-24 "></i>
      </div>
      <UncontrolledPopover placement="right" target="PopoverDismissible">
        <PopoverHeader> Dismissible popover </PopoverHeader>
        <PopoverBody>
          And here's some amazing content. It's very engaging. Right?{" "}
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}
