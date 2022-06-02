import { Component, Inject, OnInit } from '@angular/core';
import { RefundItem } from './../../shared/item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-refund-code-dialog',
  templateUrl: './add-refund-code-dialog.component.html',
  styleUrls: ['./add-refund-code-dialog.component.scss']
})
export class AddRefundCodeDialogComponent implements OnInit {

  displayedColumns: string[] = ["pCeki","hCeki","sNo","iNo","ad","oKodu","bonus","kart"];
  tableRefunds:RefundItem[]= [];

  constructor(
    public dialogRef: MatDialogRef<AddRefundCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public refunds: RefundItem[]
  ) { }



  ngOnInit(): void {
    this.tableRefunds = this.refunds;
  }

  close() {
    this.dialogRef.close();
  }

}
