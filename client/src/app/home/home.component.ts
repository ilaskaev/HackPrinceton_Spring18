import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {DocumentService} from './../services/document.service';
import {DocumentDialogComponent} from './document-dialog/document-dialog.component';
import {FolderDialogComponent} from './folder-dialog/folder-dialog.component';

@Component({
  selector: 'tldl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
      private _docService: DocumentService, private _dialog: MatDialog) {}

  public openDialog(): void {}

  ngOnInit() {}

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
            if (res != undefined){
                this._docService.createDocument(res.folderName, res.documentName);
            }
        })
  }
}
