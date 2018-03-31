import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from '../auth/auth.component';

import {AppComponent} from './../app.component';
import {AuthGuard} from './../auth/auth.guard';
import {HomeComponent} from './../home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ApplicationRouterModule {
}
