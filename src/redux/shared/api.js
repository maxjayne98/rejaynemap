import request from "../../utils/request";

const api = {
  users: (count, nat) => {
    return request({
      baseURL: "https://randomuser.me/",
      url: `api?results=${count}&nat=${nat}`,
      method: "GET",
    });
  },
};

export default api;
