import {Injectable} from '@angular/core';
import {User} from '@firebase/auth-types';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
  private _path: String;

  constructor(private _auth: AngularFireAuth) {}

  public logout(): void {
    this._auth.auth.signOut();
  }

  public get authenticated(): Observable<User> {
    return this._auth.authState;
  }

  public get uid(): string{
      return this._auth.auth.currentUser.uid;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this._auth.auth.signInWithPopup(provider)
        .then((credential) => {
          console.log(credential)
        });
  }
}
