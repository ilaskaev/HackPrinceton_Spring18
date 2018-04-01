import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './../../auth/auth.service';

@Component({
  selector: 'tldl-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.logout();
    this._router.navigate(['..', 'auth']);
  }

  ngOnInit() {}
}
