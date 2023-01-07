import { got, getCurrent } from "@/utils";
import { mergeLeft, mergeRight, includes, prop, path, pick, omit } from "ramda";
// import { toggleTokenExpired } from 'modules/app'
// import { userLogout } from 'modules/auth'
import axios from "axios";
import qs from "qs";

const FORBID_AUTH_LIST = [`/quote/klineHistory`, `/quote/getKline`];

const request = axios.create({
  baseURL: process.env.OPEN_API_URL,
  timeout: 20 * 1000,
});

request.interceptors.request.use(
  (config) => {
    // const {
    //   store: { getState },
    // } = require("src/redux/configureStore");
    // const { auth, ui } = getState();
    // const { token, uid } = auth;
    // const { local } = prop(`i18n`, ui);
    // const { timestamp: tm } = getCurrent();
    // const { url, method } = config;

    // const envData = mergeLeft(config.data, { tm, local });
    // const authData =
    //   !includes(url, FORBID_AUTH_LIST) && got(token) ? { token, uid } : {};
    // const postData = mergeRight(envData, authData);
    // const paramsData = mergeRight(envData, omit(["token"], authData));

    // if (method === `post`) {
    //   config.data = qs.stringify(mergeRight(config.data, postData));
    // }

    // //因舊版 api 沒有額外去處理如果 params 沒有就去拿 header 裡的值，所以還是要另外設定
    // if (method === `get` || method === `delete`) {
    //   config.params = mergeRight(config.params, paramsData);
    // }

    //config header
    // if (token && config?.headers) {
    config.headers = {
      // Authorization: token ? `Bearer ${token}` : "",
      // uid: uid ? uid : "",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "zh_TW",
    };
    // }
    // config.headers = {
    // "Accept-Language": local,
    // };

    return config;
  },
  (error) => {
    console.log(`request error: `, error);
    throw error;
  }
);

request.interceptors.response.use(
  (response) => {
    // const { store } = require("src/redux/configureStore");
    // const { dispatch } = store;

    const responseData = prop(`data`, response);
    // const responseStatus = prop(`status`, responseData)
    const url = path([`config`, `url`], response);

    if (!got(responseData)) {
      console.log(`[${url}] response is empty`);
    }

    // if (includes(responseStatus, [9997, 9999])) {
    //   dispatch(toggleTokenExpired(true))
    //   dispatch(userLogout())
    // }

    return response;
  },
  (error) => {
    const { response, code } = pick([`response`, `code`], error) as any;
    const httpStatus = prop(`status`, response);

    // API timeout
    if (code === `ECONNABORTED`) {
      console.log(`API timeout`);
    }

    // unknown error
    if (includes(httpStatus, [400, 500])) {
      throw Error(`Unknown Error`);
    }
    // console.log(`response error: `, error)

    throw error;
  }
);

export default request;
