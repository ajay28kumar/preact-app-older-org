import axios from 'axios';

const server = axios.create({
  baseURL: process.env.PREACT_APP_BE_ENDPOINT_BASE_URL,
});

export default server;
