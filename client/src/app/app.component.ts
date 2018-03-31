import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'tldl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loaded = false;
  constructor(private _auth: AuthService, private _router: Router) {}

  public ngOnInit(): void {
    this.checkAuth();
  }

  public checkAuth(): void {
    this._auth.authenticated.subscribe(res => {
      if (res == null) {
        this._router.navigate(['auth'])
      } else {
        this._router.navigate(['home'])
      }
      this.loaded = true;
    });
  }
}
