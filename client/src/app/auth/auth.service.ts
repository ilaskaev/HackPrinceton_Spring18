import {Injectable} from '@angular/core';
import {User} from '@firebase/auth-types';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _path: String;

  constructor(private _auth: AngularFireAuth, private _db: AngularFirestore) {}

  public logout(): void {
    this._auth.auth.signOut();
  }

  public get authenticated(): Observable<User> {
    return this._auth.authState;
  }
}
