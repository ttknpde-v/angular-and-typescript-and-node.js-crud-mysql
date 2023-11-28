import myLogging from "../log/my.logging";
import BookModel from "../entity/book.model";
/* for Writing Row sql
import {ConnectDatabase} from "../configuration/connect.database"; */

const Book = new BookModel().book

class Crud {
  constructor() {
    myLogging.info('Crud class has used')
  }

  reads = async () => {
    try {
      return await Book.findAll()  // { attributes: {exclude: ['bid']} }
        .catch((err: Error) => {
            myLogging.debug("check reads method (await Book.findAll()) : " + err.message)
            throw err
          }
        )
    } catch (err: Error | any) {
      myLogging.debug("check reads method (async) : " + err.message)
      throw err
    }
  }
  /**/
  read = async (bid: number | any) => {
    const message: string = 'not existed'
    try {

      const book = await Book.findAll({where: {bid: bid}})
        .catch((err: Error) => {
            myLogging.debug("check read method (await Book.findAll({where})) : " + err.message)
            throw err
          }
        )

      if (book.length !== 0) {

        myLogging.info(`bid : ${bid} has existed `)
        return book

      } else {

        myLogging.warn(`bid : ${bid} has not existed `)
        return message

      }

    } catch (err: Error | any) {

      myLogging.debug("check read method (async) : " + err.message)
      throw err

    }

  }
  /**/

  create = async (title: string, price: number, sale: number) => {
    try {
      const book = await Book.create({title, price, sale})
        .catch((err: Error) => {
            myLogging.debug("check create method (await Book.create({bid, title, price, sale})) : " + err.message)
            throw err
          }
        )

      if (book != null) {
        myLogging.info('created')
        return true
      } else {
        return false
      }
    } catch (err: Error | any) {
      myLogging.debug("check create method (async) : " + err.message)
      throw err
    }
  }
  /**/

  update = async (title: string, price: number, sale: number, bid: number | any) => {
    try {
      return await Book.findAll({where: {bid: bid}}).then(async (book: any) => {
        myLogging.info('found bid ' + bid)
        if (book.length !== 0) {
          return await Book.update({title, price, sale}, {where: {bid: bid}}).then(() => {
            myLogging.info('updated')
            return true
          })
        } else {
          return false
        }
      })
    } catch (err: Error | any) {
      myLogging.debug("check update method (async) : " + err.message)
      throw err
    }
  }

  delete = async (bid: number | any) => {
    try {
      return await Book.findAll({where: {bid: bid}}).then(async (book: any) => {
        if (book.length !== 0) {
          return await Book.destroy({where: {bid: bid}}).then(() => {
            return true
          })
        } else {
          return false
        }
      })
    } catch (err: Error | any) {
      myLogging.debug("check delete method (async) : " + err.message)
      throw err
    }
  }
  /**/

}


/*
new Crud().read(500).then((response) => {

  // myLogging.info(response)
  console.log(response)
})
*/

/*new Crud().create("Spring Framework 2023",500,2500).then((response) => {
  // myLogging.info(response)
  console.log(response)
})*/

/*new Crud().reads().then((response) => {
  // myLogging.info(response)
  console.log(response)
})*/
export default Crud
