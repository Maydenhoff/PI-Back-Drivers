const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const {
    URL_VERCEL, LOCAL_HOST
  } = process.env;

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
    origin:[URL_VERCEL, LOCAL_HOST]
}));

server.use(router);

module.exports = server;
