import api from "./axios";

async function getEnemData() {
  return api.get("/data").then((res) => {
    return res.data;
  });
}

export { getEnemData };
