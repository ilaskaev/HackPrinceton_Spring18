import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tldl-folder-dialog',
  templateUrl: './folder-dialog.component.html',
  styleUrls: ['./folder-dialog.component.scss']
})
export class FolderDialogComponent implements OnInit {
  constructor(
      public dialogRef: MatDialogRef<FolderDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
