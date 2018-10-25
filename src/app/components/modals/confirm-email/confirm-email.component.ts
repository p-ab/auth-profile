import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent {
  email: string;
  isRequested: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseConfirm() {
    this.dialogRef.close(this.data.name);
  }

  sendLetter() {
    this.isRequested = !this.isRequested;
  }
}
