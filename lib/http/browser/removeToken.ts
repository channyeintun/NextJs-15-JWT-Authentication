import axios from "axios";
import { httpClient } from "./client";

export const removeToken = () => {
    httpClient.defaults.headers.Authorization = "";
    axios.defaults.headers.common.Authorization = "";
};