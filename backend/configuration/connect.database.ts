import {Sequelize, DataTypes} from 'sequelize'
import myLogging from "../log/my.logging";
import info from "./info.database";

// myLogging.info(info.DATABASE);
class ConnectDatabase {
  /*
    ORM stands for Object-Relational Mapping.
    It is a programming technique and a software design pattern that allows developers to interact with relational databases
    using object-oriented programming languages.
  */
  public sequelize: Sequelize | undefined

  /*
    if I need to use sequelize to connect database
    it must be to create new object of this class
    then call sequelize attribute
  */
  constructor() {
    myLogging.info('ConnectDatabase class has used')
    this.setSequelize()
  }

  private async setSequelize() {
    this.sequelize = new Sequelize(
      info.DB!,
      info.USER!,
      info.PASSWORD!,
      {
        /* set different port */
        dialect: 'mysql',
        host: info.HOST,
        port: <number | undefined>info.PORT, /* this line specify type => port:<Type You want> */
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    )
    /*
      for checking to connect !
      this.sequelize.authenticate().then(() => {
        myLogging.info('connected successfully!!')
      }).catch((error: Error) => {
        myLogging.debug('message : failed connect!!')
        throw error
      })
    */
  } // ended

}

export {
  DataTypes,
  ConnectDatabase // need to create object before use sequelize
}
