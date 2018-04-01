import {Injectable} from '@angular/core';
import {Query} from '@firebase/database';
import {ThenableReference} from '@firebase/database-types';
import {AngularFireDatabase, AngularFireList, PathReference} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../auth/auth.service';

import {Document} from './../interfaces/document';
import {Folder} from './../interfaces/folder';

@Injectable()
export class DocumentService {
  private _rootPath: string;
  private _uid: string;
  private _path: string;

  private _ref: AngularFireList<Folder>;
  constructor(private _db: AngularFireDatabase, private _auth: AuthService) {
    this._rootPath = 'folder';
    this._uid = this._auth.uid;
    this._path = `${this._rootPath}/${this._uid}`;
    this._ref = this._db.list(this._path);
  }

  public createFolder(name: string, folder: Folder) {
    this._ref.update(name, folder)
        .then(res => {
          console.log('success', res);
        })
        .catch(res => {
          console.log('err', res);
        })
  }

  public createDocument(folderName: string, document: Document) {
      this._db.object(`${this._path}/${folderName}/documents/${document.name}`).set(true)
  }


}
