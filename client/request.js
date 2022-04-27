import axios from "axios";
import { getValue } from "../utils/common";
import { baseUrl } from "./config";

export const signup = async (payload) => {
  try {
    const result = await axios.post(baseUrl + "/api/register", payload);
    return result.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};
