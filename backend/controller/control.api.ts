import bookRouter from "../router/book.router"; // it has created
import HttpServiceModules from "../service/http.service.modules";
import myLogging from "../log/my.logging";

class ControlApi {

  private httpServiceModules: HttpServiceModules

  constructor() {
    myLogging.info('ControlApi class has used')
    this.httpServiceModules = new HttpServiceModules()
  }

  public display() {
    let app : any = this.httpServiceModules.app
    app.use(bookRouter.router) // called the router
    app.listen(3000, (err: Error) => {
        if (err) {
          myLogging.debug('found error on port 3000')
          throw err
        }
        myLogging.info('you are on http://localhost:3000')
      }
    )
  } // ended

}


new ControlApi().display()
