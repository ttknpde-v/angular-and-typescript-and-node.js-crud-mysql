import HttpServiceModules from "../service/http.service.modules"; // class
import Crud from "../crud/crud";
import myLogging from "../log/my.logging";
import cors from 'cors' // for allowing access another port

class BookRouter {

  public httpServiceModules: HttpServiceModules // | undefined
  public crud: Crud // | undefined
  public router

  constructor() {
    myLogging.info('BookRouter class has used')
    this.crud = new Crud()
    this.httpServiceModules = new HttpServiceModules()
    this.router = this.httpServiceModules.router()
    this.setMiddleware()
    this.setRouter()
  }

  private setMiddleware() {
    let bodyParser = this.httpServiceModules.bodyParser
    let corsAngular = cors //**
    this.router.use(corsAngular())
    this.router.use(bodyParser.json())
    this.router.use(bodyParser.urlencoded({extended: true}))

  }

  public setRouter = () => {

    this.router.get('/reads', async (req, res) => {
      await bookRouter.crud.reads()
        .then((result) => {
          return res
            .status(202)
            .json({
              status: "accepted",
              data: result // can be string if nothing value on table
            })
        }).catch((errors) => {
          myLogging.error("something was wrong from reads async method from crud book {} : " + errors.message)
          throw errors
        })
    })
    //**************************************************************************

    this.router.get('/read/:bid', async (req, res) => {

      let value: { bid: number | string } = req.params // in typescript we retrieve parameter on url like this
      // console.log(bid) { bid: '8' }
      await bookRouter.crud.read(value.bid)
        .then((result) => {
          return res
            .status(202)
            .json({
              status: "accepted",
              data: result // can be string if nothing value on table
            })
        }).catch((errors) => {
          myLogging.error("something was wrong from reads async method from crud book {} : " + errors.message)
          throw errors
        })
    })
    //**************************************************************************

    this.router.post('/create', async (req, res) => {
      /*let tile = req.body['title']
      let price = req.body['price']
      let sale = req.body['sale']*/
      let {title, price, sale} = req.body
      await bookRouter.crud.create(title, price, sale)
        .then((result) => {
          return res
            .status(201)
            .json({
              status: "created",
              data: result // just be true & false
            })
        }).catch((errors) => {
          myLogging.error("something was wrong from create async method from crud book {} : " + errors.message)
          throw errors
        })
    })
    //**************************************************************************


    this.router.delete('/delete/:bid', async (req, res) => {
      try {
        let value: { bid: number | string } = req.params
        await bookRouter.crud.delete(value.bid).then((result) => {
          return res.status(200).json({
            status: "ok",
            data: result
          })
        }).catch((errors: Error) => {
          myLogging.error("something was wrong from delete async method from crud book {} : " + errors.message)
          throw errors
        })
      } catch (errors: Error | any) {
        res.status(405).json({
          status: 'method not allowed',
          message: `cause from delete async method (delete(tid)) : ${errors.message}`
        })
        throw errors
      }
    })


    this.router.put('/update/:bid', async (req, res) => {
      try {
        let {title, price, sale} = req.body
        let value: { bid: number | string } = req.params
        await bookRouter.crud.update(title, price, sale, value.bid)
          .then((result) => {
            return res.status(200).json({
              status: "ok",
              data: result
            })
          }).catch((e : Error) => {
            myLogging.warn(`cause from update(title, price, sale, value.bid) method await : ${e.message}`)
            throw e
          })
      } catch (e : Error | any) {
        res.status(405).json({
          status: 'method not allowed',
          message: `cause from book router put async method (update) : ${e.message}`
        })
        // throw myException.handlerException(`cause from routerEmployee post async method (create) : ${e.message}`) /* when find the exception == ended process*/
        throw e
      }
    })
  }

}

// can use router , By calling attribute router like bookRouter.router
const bookRouter = new BookRouter()
export default bookRouter
