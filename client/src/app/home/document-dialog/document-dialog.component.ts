import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {DocumentService} from './../../services/document.service';

@Component({
  selector: 'tldl-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit {
  form: FormGroup;
  folders: string[];
  constructor(
      public dialogRef: MatDialogRef<DocumentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _docService: DocumentService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({documentName: '', folderName: ''});
    this._docService.getAllFolderNames().subscribe(res => {
      this.folders = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
