import api from "./apiServer";

const loadChats = async (userId) => {
  return await api.post("/chats", { userId: userId });
};

export default loadChats;
