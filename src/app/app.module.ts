import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutes} from "./app.routes";
import {AppComponent} from "./app.component";
import {BooksTableComponent} from "./components/books-table/books-table.component";
import {BookFormCreateComponent} from "./components/book-form-create/book-form-create.component";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {BookFormUpdateComponent} from "./components/book-form-update/book-form-update.component";


@NgModule({
  declarations: [
    AppComponent,
    BooksTableComponent,
    BookFormCreateComponent,
    BookFormUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // class for app.component.html
}
