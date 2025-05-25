import axios from "axios";

const BASE_URL = `http://백엔드서버주소입력예정:8080/moamoa`;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default defaultInstance;
