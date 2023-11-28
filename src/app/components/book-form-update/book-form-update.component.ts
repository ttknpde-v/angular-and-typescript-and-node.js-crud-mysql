import {Component, OnInit} from '@angular/core';
import {HttpProtocolService} from "../../service/http-protocol.service";
import {BookEntity} from "../../entity/book.entity";
import { ActivatedRoute } from '@angular/router';
import {NgZone} from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: 'app-book-form-update',
  templateUrl: './book-form-update.component.html',
  styleUrl: './book-form-update.component.css'
})
export class BookFormUpdateComponent implements OnInit {

  private httpProtocolService : HttpProtocolService
  private route: ActivatedRoute
  public bookEntity : BookEntity
  public confirm : boolean
  constructor(httpProtocolService : HttpProtocolService , route: ActivatedRoute ,
              private ngZone : NgZone , // up to me !! can write
              private router : Router)  {
    this.httpProtocolService = httpProtocolService;
    this.route = route
    /* initial interface class */
    this.bookEntity = new class implements BookEntity {
      bid! : number;
      price! : number;
      sale! : number;
      title! : string;
    }
    this.confirm = false
  }


  ngOnInit() : void {
    let param = this.route.snapshot.paramMap.get('bid')
    this.httpProtocolService.read(Number(param)).subscribe(
      (response : any) => {
        // console.log(response.data[0]) //  don't forget I use findAll
        if (response.data == "not existed") {
          this.ngZone.run(() => {this.router.navigateByUrl('books')})
        } else {
          this.bookEntity = response.data[0]
        }
    })
  }

  public updateBook () {
    /*
       use [(ngModel)] it was easy to set interface entity
       I think it's good for updating form
    */
    if (this.confirm) {
      // console.log(this.bookEntity)
      this.httpProtocolService.update(this.bookEntity).subscribe(
        (response : any) => {
          // console.log(response.data[0]) //  don't forget I use findAll
          if (response.data) {
            this.ngZone.run(() => {this.router.navigateByUrl('books')})
          } else {
            window.alert('something was wrong about your book')
          }
        })
    } else {
      window.alert('please confirm your book!!')
    }
  }
}
