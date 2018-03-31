import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ToastService {
  constructor(private _toast: MatSnackBar) {}

  public toast(message: string): void {
    this._toast.open(message);
  }
}
