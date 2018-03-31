import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/router';

@Component({
  selector: 'tldl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
      this._auth.authenticated.subscribe(res => {
          if (res != null){
            this._router.navigate(['home'])
          }
      })
  }

}
