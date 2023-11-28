import {Component, OnInit} from '@angular/core';
import {HttpProtocolService} from "../../service/http-protocol.service";
import {BookEntity} from "../../entity/book.entity";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css'
})
export class BooksTableComponent implements OnInit {
  private books: Array<BookEntity>
  private httpProtocolService: HttpProtocolService

  constructor(httpProtocolService: HttpProtocolService) {
    this.books = new Array<BookEntity>()
    this.httpProtocolService = httpProtocolService;
  }
  ngOnInit(): void {
    /*
      ngOnInit is a lifecycle hook in Angular
      that is called after the constructor
    */
    this.httpProtocolService.reads().subscribe(
      (response: any) => {
        // console.log(response.data)
        // very smart you just define to be same type
        this.books = response.data
      }
    )
  }
  public getBooks(): BookEntity[] {
    return this.books
  }
  public delete(bid : number , i : number) {
    if (window.confirm('Are you sure for cleaning book id '+bid+' ?')) { // if true
      this.httpProtocolService.delete(bid).subscribe(
        (response : any) => {
          // console.log(response)
          // splice() method changes the content of an array,
          // and syntax
          // array.splice(index, howMany, [element1][, ..., elementN]);
          // index − Index at which to start changing the array.
          // howMany - An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
          if (response.data == false) {
            window.confirm('Can not delete. because book id '+bid+' haven\'t existed')
          }
          else {
            this.books.splice(i,1)
          }
        })
    }
  }
}
