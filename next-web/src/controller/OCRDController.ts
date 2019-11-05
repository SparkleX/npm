import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  request,
  queryParam,
  response,
  requestParam
} from "inversify-express-utils";

import {RepositoryFactory, RepositoryHandler} from "next-repository"
import {OrderRepository} from "../repository/OrderRepository"


class RepoHandlerImpl implements RepositoryHandler {
    execute(sql: string, ...params: any): Promise<any> {
		console.debug("Should be mocked");
        return new Promise<string>((resolve, reject) => { return resolve("123")});
    }
}

@controller("/api")
export class OCRDController{
  
  @httpGet("/test")
  public async test(): Promise<any> {
	var orderRepository = RepositoryFactory.newRepository(OrderRepository, new RepoHandlerImpl());
	var data = await orderRepository.findByCode('123');
    return data;
  }
}
