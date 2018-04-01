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

  public createFolder(name: string) {
    this._ref.update(name, {'date': new Date()});
  }

  public createDocument(folderName: string, documentName: string) {
    console.log(folderName, documentName);
    this._db.object(`${this._path}/${folderName}/documents/${documentName}`)
        .set(true)
  }

  public getAllFolderNames() {
    return this._db.object(this._path)
        .valueChanges()
        .map((k, v) => Object.keys(k));
  }
}
