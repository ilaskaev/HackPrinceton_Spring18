import { LogoutComponent } from './../core/logout/logout.component';
import { HomeComponent } from './../home/home.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from '../auth/auth.component';

import {AppComponent} from './../app.component';
import {AuthGuard} from './../auth/auth.guard';
import {EditorComponent} from './../editor/editor.component';


const routes: Routes = [
  {path: 'document/:id', component: EditorComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ApplicationRouterModule {
}
