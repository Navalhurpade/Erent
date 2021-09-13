import apisouce from "apisauce";
import { io } from "socket.io-client";

const ConnnectionUri = process.env.REACT_APP_SERVER_URL;

export const socket = io(ConnnectionUri);

export const connect = async (user) => {
  try {
    await socket.connect();
    socket.emit("user-joined", user);
  } catch (error) {
    console.log(error);
  }
};

export const onMessageRecive = (callback) => {
  socket.on("message-recive", (message) => {
    callback(message);
  });
};

export const sendMessage = (message) => {
  socket.emit("send-message", message);
};

const api = apisouce.create({
  baseURL: ConnnectionUri,
});

export default api;
