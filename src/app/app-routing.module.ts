import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:"list",component:ListComponent },
  { path:"", component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
