import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as express from "express";
import * as compression from 'compression'
import { Container } from "inversify"
import "reflect-metadata";
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from "inversify-express-utils"

import { container } from "./inversify.config"
import "./controller/OCRDController"

let server = new InversifyExpressServer(container);
server.setConfig(app => {
  app.use(morgan("tiny"));
  app.use(compression());
  app.use(express.static('public'));
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.info('server start at port:3000');