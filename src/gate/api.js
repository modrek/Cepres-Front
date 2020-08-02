import axios from "axios";
import { selectUser } from "store/selectors/users";

import { apiUrl, enableNetworkLogger } from "helpers/configs";
import { networkLogger } from "helpers/utility";

//const store =null;//= useSelector(selectUser);

const config = {
  headers: { Authorization: `Bearer "254"` },
};
// auth: {
//   username: "test",
//   password: "test",
// },

const api = axios.create({
  baseURL: apiUrl,
  config,
});

api.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    if (enableNetworkLogger) {
      networkLogger(response);
    }
    // if (response?.data?.message)
    //   notif.addNotification({
    //     title: "Success",
    //     message: response?.data?.message,
    //     type: "success",
    //     insert: "top",
    //     container: "top-right",
    //     animationIn: ["animated", "fadeIn"],
    //     animationOut: ["animated", "fadeOut"],
    //     dismiss: {
    //       duration: 5000,
    //       onScreen: true,
    //     },
    //   });

    return response;
  },
  function (error) {
    const responseStatus = error?.response?.status + "";
    let message = "some error has occured ";
    // notif.addNotification({
    //   title: "Error",
    //   message,
    //   type: "danger",
    //   insert: "top",
    //   container: "top-right",
    //   animationIn: ["animated", "fadeIn"],
    //   animationOut: ["animated", "fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true,
    //   },
    // });

    return Promise.reject(error);
  }
);

export default api;
