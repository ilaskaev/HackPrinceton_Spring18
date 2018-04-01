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
  private _uid: string;
  private _folderPath: string;
  private _documentPath: string;

  private _ref: AngularFireList<Folder>;
  constructor(private _db: AngularFireDatabase, private _auth: AuthService) {
    this._uid = this._auth.uid;
    this._folderPath = `folder/${this._uid}`;
    this._documentPath = `document`;
    this._ref = this._db.list(this._folderPath);
  }

  public createFolder(name: string) {
    this._ref.update(name, {'date': new Date()});
  }

  public createDocument(folderName: string, documentName: string) {
    let emptyDoc: Document = {date: new Date(), name: documentName};
    let pushRef = this._db.list(`${this._documentPath}`).push(emptyDoc);
    this._db
        .object(`${this._folderPath}/${folderName}/documents/${pushRef.key}`)
        .set(true)
  }

  public getAllFolderNames() {
    return this._db.object(this._folderPath)
        .valueChanges()
        .map((k, v) => Object.keys(k));
  }
}
