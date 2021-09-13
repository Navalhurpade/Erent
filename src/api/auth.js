import api from "./apiServer";

async function login(loginDetails) {
  const responce = await api.post("/auth", loginDetails);
  return responce;
}

async function register(userDetails) {
  const responce = await api.post("/auth/register", userDetails);
  return responce;
}

export default { login, register };
