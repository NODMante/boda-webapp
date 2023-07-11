import {
    AUTH_URL,
    PROPERTY_URL,
    BILLING_URL,
    PAYMENT_URL,
    DASHBOARD_URL,
    INTERNAL_URL,
  } from "@/constants/endpoints";
  import axios from "axios";
  
  export const axiosProperty = axios.create({
    baseURL: PROPERTY_URL,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  export const axiosBilling = axios.create({
    baseURL: BILLING_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  export const axiosPayment = axios.create({
    baseURL: PAYMENT_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  export const axiosAuth = axios.create({
    baseURL: AUTH_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  export const axiosDashboard = axios.create({
    baseURL: DASHBOARD_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  export const axiosInternal = axios.create({
    baseURL: INTERNAL_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  