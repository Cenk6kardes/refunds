import { RefundItem } from './../../shared/item';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public refunds: RefundItem[]) { }
  
  
    displayedColumns: string[] = ['pCeki', 'hCeki', 'sNo', 'iNo', "ad", "öTipi", "bonus", "kart"];
    tableRefunds:RefundItem[]= [];

  ngOnInit(): void {
    this.tableRefunds = this.refunds;
  }
  
  close() {
    this.dialogRef.close();
  }

}
