import { LanguageService } from './../../service/language.service';
import { Subject, takeUntil } from 'rxjs';
import { RefundTableService } from './../../service/refund-table.service';
import { RefundItem } from './../../shared/item';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit,OnDestroy {

    

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>,
    private refundTableService:RefundTableService,
    @Inject(MAT_DIALOG_DATA) public refunds: RefundItem[],
    private toastr:LanguageService
  ) { }
  

  loading!: boolean;
  displayedColumns: string[] = ['pCeki', 'hCeki', 'sNo', 'iNo', "ad", "öTipi", "bonus", "kart"];
  private unsubscribe = new Subject<void>();

  ngOnInit(): void {
  
     }
  
  confirmPayment() {
    /* this.refundTableService.confirmPayment(this.refunds).subscribe(); 
     this.refundTableService.getDatas(body).pipe(takeUntil(this.unsubscribe)).subscribe((res) => { this.dataSource.data = res; this.loading= false  },
      (error) => { this.languageService.errorToaster(error.message); this.loading= false })
    */
    this.loading = true;
    this.refundTableService.confirmPayment(this.refunds).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {      

      let res = Object.values(response)
     
      let refErrors = res.filter(refund => refund.transactionStatus === "REFUND_ERROR")
      console.log(refErrors);
      refErrors.forEach(error => {
        this.toastr.errorToaster(error.PSS_NO +" numaralı sipariş iade edilemedi.")
      })   

      let sapErrors = res.filter(refund => refund.transactionStatus === "SAP_SAVE_ERROR")
      console.log(sapErrors);
      sapErrors.forEach(error => {
        this.toastr.errorToaster(error.PSS_NO +" numaralı sipariş SAP'ye kaydedilemedi.")
      })   
      this.loading = false;

      this.dialogRef.close(true)
      
       
    }, (err) => { console.log(err);this.loading=false })


  }
  
  close() {
    this.dialogRef.close(false);
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
