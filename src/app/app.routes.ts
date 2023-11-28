import {NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import {BooksTableComponent} from "./components/books-table/books-table.component";
import {BookFormCreateComponent} from "./components/book-form-create/book-form-create.component";
import {BookFormUpdateComponent} from "./components/book-form-update/book-form-update.component";

const routes: Routes = [
  {path:'books',component:BooksTableComponent} ,
  {path:'form',component:BookFormCreateComponent},
  {path:'edit/:bid',component:BookFormUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {

}
