import { LanguageService } from './../../service/language.service';
import { RefundTableService } from './../../service/refund-table.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { RefundItem } from './../../shared/item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-refund-code-dialog',
  templateUrl: './add-refund-code-dialog.component.html',
  styleUrls: ['./add-refund-code-dialog.component.scss']
})
export class AddRefundCodeDialogComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ["pCeki","hCeki","sNo","iNo","ad","oKodu","bonus","kart"];
  loading = false;
  private unsubscribe = new Subject<void>();

  constructor(
    public toastr:LanguageService,
    public refundService:RefundTableService,
    public dialogRef: MatDialogRef<AddRefundCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public refunds: RefundItem[]
  ) { }

  ngOnInit(): void {

  }
  

  confirm() {
    this.loading = true;
    
    this.refundService.confirmCode(this.refunds).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      
       
      let errors = response.failureList!.filter(refund => refund.transactionStatus === "SAP_SAVE_ERROR")
      errors.forEach(error => {
        this.toastr.errorToaster(error.PIS_NO +" "+error.MESSAGE)
      })   
      this.loading = false;

      this.dialogRef.close(true)
      
    }, (err) => { console.log(err); this.loading = false });
    


  }

  close() {
    this.refunds.forEach(x => x.ONAY_KOD = "");
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
