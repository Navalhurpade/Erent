import api from "./apiServer";

async function getPosts() {
  const responce = await api.get("/posts");
  return responce;
}

async function createPost(postDetails) {
  const responce = await api.post("/posts/new", postDetails);
  return responce;
}

export default { getPosts, createPost };
