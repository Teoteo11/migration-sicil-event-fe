import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string | any;
  message: string;
  actionClick: () => void;
  showInputField: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  {


  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog = (): void => this.dialogRef.close();

  continue = () => {
    this.data.actionClick();
    this.closeDialog();
  }

}
