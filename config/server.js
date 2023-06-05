import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"

import { dbConnect } from "./db.js";
import gateway from "../routes/gateway.js";
import device from "../routes/device.js";

export class Server {
  constructor() {
    dotenv.config(); /// to check
    //creating server constants
    this.app = express();
    this.port = process.env.PORT;
    this.route = {
      gateways: "/api/gateways",
      devices: "/api/gateway/",
    };

    //DB start
    this.dbConection();

    //Middlewares
    this.middlewares();

    //Routing
    this.routes();
  }

  ////Middlewares
  middlewares() {
	 this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.static("public", { index: ["index.html", "index.htm"] })
    );
  }
  ///Db Conection
  async dbConection() {
    await dbConnect();
  }

  ////App Routes
  routes() {
    this.app.use(this.route.gateways, gateway);
    this.app.use(this.route.devices, device);
  }
  ///Server Start
  listen() {
    this.app.listen(this.port, () => {
      console.log(`API REST server running at http://localhost:${this.port}`);
    });
  }
}
