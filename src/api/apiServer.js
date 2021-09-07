import apisouce from "apisauce";

const api = apisouce.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default api;
