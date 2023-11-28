import myLogging from "../log/my.logging";
import {ConnectDatabase, DataTypes} from "../configuration/connect.database";

class BookModel {
  private sequelize: any

  constructor() {
    myLogging.info('BookModel class has used (injects sequelize)')
    this.sequelize = new ConnectDatabase().sequelize;
  }

  get book() {
    return this.sequelize.define('books', {
        bid: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.DOUBLE
        },
        sale: {
          type: DataTypes.DOUBLE,
        }
      }, {
        // freeze name table not using *s on name
        freezeTableName: true,
        // don't use createdAt/update
        timestamps: false
      }
    )
  }
  
}

export default BookModel
