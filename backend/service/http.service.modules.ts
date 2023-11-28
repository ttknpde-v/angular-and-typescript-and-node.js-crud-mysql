import express, {Application, Request, Response, Router} from "express";
import bodyParser from 'body-parser';
import myLogging from "../log/my.logging";

class HttpServiceModules {

  constructor() {
    myLogging.info('HttpServiceModules class has used')
  }
  public get app() : Application {
    return express()
  }
  public get express () {
    return express
  }
  /*public get request() {
    return Request
  }

  public get response() {
    return Response
  }*/

  public get bodyParser() {
    return bodyParser
  }

  public get router() {
    return Router
  }


}

export default HttpServiceModules
