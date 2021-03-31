import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FeedComponent } from "./feed.component";

export const routes: Routes = [
    { path:'', component: FeedComponent }
  ];
  export class FeedRoutingModule { }