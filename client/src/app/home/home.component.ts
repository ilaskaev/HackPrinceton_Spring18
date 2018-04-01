import { DocumentService } from './../services/document.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';

@Component({
  selector: 'tldl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _docService: DocumentService, private _dialog: MatDialog) { }

  public openDialog(): void {
    // let dialogRef = this._dialog.open(FolderDialogComponent, {
    //     width: '300px'
    // })

    // dialogRef.afterClosed().subscribe(res => {
    //     console.log('closed', res);
    // })
  }

  ngOnInit() {
  }

  public newFolder(): void {
    let dialogRef = this._dialog.open(FolderDialogComponent, {
        width: '300px'
    })

    dialogRef.afterClosed().subscribe(res => {
        console.log('closed', res);
    })
    // this._docService.createFolder('qwe', {
    //     'date': new Date()
    // })
  }

  public newDocument(): void {
      this._docService.createDocument('qwe', {'date': new Date(), 'name': 'ehas'})
  }

}
