import { HomeComponent } from './../home/home.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class ApplicationRouterModule { }
