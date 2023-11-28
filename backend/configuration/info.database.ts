import path from 'path';
import dotenv from 'dotenv'
dotenv.config({path : path.resolve('../env/.env')})
/*
  import myLogging from "../log/my.logging";
*/
const info = {
  // read!!! error you will see
  // comes from an index signature, so it must be accessed with ***** ['required']
  HOST : process.env['SQL_HOST'],
  USER : process.env['SQL_USERNAME'],
  PASSWORD : process.env['SQL_PASSWORD'],
  DB : process.env['SQL_DATABASE'],
  PORT : process.env['SQL_PORT']
}
/*myLogging.info(info.DB)*/
export default info

