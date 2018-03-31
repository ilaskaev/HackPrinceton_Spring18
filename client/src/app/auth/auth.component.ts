import { ToastService } from './../services/toast.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Route} from '@angular/router';

import {AuthService} from './auth.service';

@Component({
  selector: 'tldl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router, private _toast: ToastService) {}

  ngOnInit(): void{this._auth.authenticated.subscribe(res => {
    if (res != null) {
      this._router.navigate(['home'])
    }
  })}

  signInWithGithub(): void {
    this.notAvailable();
    // this._auth.githubLogin().then(() => this.afterSignIn());
  }

  signInWithGoogle(): void {
    this._auth.googleLogin().then(() => this.afterSignIn());
  }

  signInWithFacebook(): void {
    this.notAvailable();
    // this._auth.facebookLogin().then(() => this.afterSignIn());
  }

  signInWithTwitter(): void {
      this.notAvailable();
    // this._auth.twitterLogin().then(() => this.afterSignIn());
  }

  private notAvailable(): void {
      this._toast.toast('Only Google provider is enabled at the moment. :(')
  }

  private afterSignIn(): void {
    this._router.navigate(['home']);
  }
}
