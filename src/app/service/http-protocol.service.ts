import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BookEntity} from "../entity/book.entity";
import {Observable} from "rxjs"; // for define type of response

@Injectable({
  providedIn: 'root'
})
export class HttpProtocolService {
  private readonly BOOK_REST_API: string = 'http://localhost:3000'; // my base api I build
  private readonly HTTP_HEADER = new HttpHeaders().set('Content-Type', 'application/json');  // use when send url + arg !!
  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public reads(): Observable<any> {
    return this.httpClient.get(this.BOOK_REST_API + `/reads`)
  }

  public read(bid: number): Observable<any> {
    return this.httpClient.get(this.BOOK_REST_API + `/read/` + bid, {headers: this.HTTP_HEADER})
  }

  public create(bookEntity: BookEntity): Observable<any> {
    return this.httpClient.post(this.BOOK_REST_API + `/create`, bookEntity, {headers: this.HTTP_HEADER})
  }

  public update(bookEntity: BookEntity): Observable<any> {
    return this.httpClient.put(this.BOOK_REST_API + `/update/` + bookEntity.bid, bookEntity, {headers: this.HTTP_HEADER})
  }

  public delete(bid: number): Observable<any> {
    return this.httpClient.delete(this.BOOK_REST_API + `/delete/` + bid, {headers: this.HTTP_HEADER})
  }
}
