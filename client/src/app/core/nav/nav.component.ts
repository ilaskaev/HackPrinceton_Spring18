import { AuthService } from './../../auth/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tldl-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    public profilePicSrc = '';
    public hide = true;

  constructor(private _authService: AuthService) {
        this._authService.authenticated.subscribe(res =>{
            if (res != null){
                this.profilePicSrc = res.photoURL;
                this.hide = false;
            }
        });
  }

  ngOnInit() {}
}
