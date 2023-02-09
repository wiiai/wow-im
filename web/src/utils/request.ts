import { getToken } from "@/utils/auth";
import axios from "axios";
import Url from "url-parse";

export const isProd = process.env.NODE_ENV === "production";
export const host = isProd ? 'https://wow-im.airtlab.com' :  "http://localhost:3010";

export const instance = axios.create({
  timeout: 20 * 1000
});

instance.interceptors.request.use(
  function(config) {
    return {
      ...config,
      url: `${host}${config.url}`,
      method: 'POST',
      headers: {
        ...(config.headers || {}),
        token: getToken()
      }
    };
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const res = response.data;
    if (+res.errCode === 0) {
      res.success = true;
    } else {
      res.success = false;
    }
    return res;
  },
  error => {
    console.log(error)
    if (error.message.includes('401')) {
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export const request = instance;