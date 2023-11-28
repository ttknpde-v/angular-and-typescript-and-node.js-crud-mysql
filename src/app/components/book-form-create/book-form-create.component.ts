import {Component, NgZone} from '@angular/core';
import {HttpProtocolService} from "../../service/http-protocol.service";
import {BookEntity} from "../../entity/book.entity";
import {Router} from "@angular/router";
/*import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";*/

@Component({
  selector: 'app-book-form-create',
  templateUrl: './book-form-create.component.html',
  styleUrl: './book-form-create.component.css'

})
export class BookFormCreateComponent {
  // for redirect to path /lists
  private ngZone : NgZone
  private router : Router
  private httpProtocolService : HttpProtocolService
  private bookEntity : BookEntity
  constructor(httpProtocolService: HttpProtocolService ,ngZone : NgZone , router : Router) {
    this.httpProtocolService = httpProtocolService;
    this.ngZone = ngZone
    this.router = router
    // way to start interface
    this.bookEntity = new class implements BookEntity {
      bid!: number ;
      price!: number;
      sale!: number ;
      title!: string;
    }
  }


  public createBook (bookForm : any) {
    this.bookEntity.title = bookForm.title
    this.bookEntity.price = bookForm.price
    this.bookEntity.sale = bookForm.sale
    if (bookForm.confirm) {
      this.httpProtocolService.create(this.bookEntity).subscribe(
        (response : any) => {
          if (response.data) { // my response designs for validate condition
            this.ngZone.run(() => {this.router.navigateByUrl('books')})
          }
        })

    } else {
      window.alert('please confirm your book!!')
    }
  }
}
