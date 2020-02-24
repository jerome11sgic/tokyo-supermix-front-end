import React from "react";
import ReactDOM from "react-dom";
import { notification } from "antd";

export default function Notification(type, message) {
  return notification[type]({
    message: message
  });
}
