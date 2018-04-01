import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';

import {DocumentService} from './../services/document.service';
import {DocumentDialogComponent} from './document-dialog/document-dialog.component';
import {FolderDialogComponent} from './folder-dialog/folder-dialog.component';

@Component({
  selector: 'tldl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  documentTypes: string[];
  folders: DocumentCount[];
  displayedColumns = ['title', 'owner', 'date'];
  dataSource = new MatTableDataSource<Document>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private _docService: DocumentService, private _dialog: MatDialog) {}

  public openDialog(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.documentTypes = [
      'Recent Documents', 'Your Documents', 'Shared Documents',
      'Deleted Documents'
    ];
    this._docService.getAllFolders().subscribe(folders => {
      this.folders = [];
      let keys = Object.keys(folders);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let c = folders[key];
        this.folders.push({
          name: key,
          count: c.documents == null ? 0 : Object.keys(c.documents).length
        });
      }
    });
    this._docService.getRecentDocuments().subscribe(res => {
      let promises = [];

      for (let i = 0; i < res.length; i++) {
        let id = res[i];
        let promise = new Promise(
            (resolve, reject) => {this._docService.getDocument(id).subscribe(
                res => {
                  resolve(Object.assign({'id': id}, res));
                },
                err => {
                  reject(err);
                })})
        promises.push(promise);
      }
      Promise.all(promises).then(res => {
        this.dataSource.data = res;
        console.log('recent', res);
      });
    });
  }

  public newFolder(): void {
    let dialogRef = this._dialog.open(FolderDialogComponent, {width: '300px'});

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {
        this._docService.createFolder(res);
      }
    })
  }

  public newDocument(): void {
    let dialogRef =
        this._dialog.open(DocumentDialogComponent, {width: '300px'});

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {
        this._docService.createDocument(res.documentName, res.folderName);
      }
    })
  }
}

export interface DocumentCount {
  name: string;
  count: number;
}
