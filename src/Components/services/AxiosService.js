import axios from "axios";

import handleError from "../Constant/HandleError";
import { SuperMix_Base_Url, Login_Base_Url } from "../Constant/Api";

function addParamsToURL(url, params) {
  if (params) {
    let temp = url;
    temp = temp + "/" + params;
    return temp;
  }
  return url;
}

function getService(service) {
  switch (service) {
    case "supermix":
      return SuperMix_Base_Url;
    case "login":
      return Login_Base_Url;
    default:
      console.log("ERROR: Please specify a service !");
  }
}

const getHeaders = token => {
  if (token) {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${""}`,
        "Access-Control-Allow-Origin": "*"
      }
    };
  } else {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};

export const api = (method, service, endpoint, token, body, params) => {
  switch (method) {
    case "GET":
      // HTTP GET Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        console.log("workkk");
        const SERVICE = getService(service);
        const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
        axios
          .get(URL, getHeaders(token))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    case "POST":
      // HTTP POST Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const SERVICE = getService(service);
        const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
        axios
          .post(URL, body, getHeaders(token))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error.response.data);
          });
      });
    case "DELETE":
      // HTTP DELETE Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const SERVICE = getService(service);
        const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
        axios
          .delete(URL, getHeaders(token))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    case "PUT":
      // HTTP PUT Request - Returns Resolved or Rejected Promise
      return new Promise((resolve, reject) => {
        const SERVICE = getService(service);
        const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
        axios
          .put(URL, body, getHeaders(token))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });

    default:
      return null;
  }
};
