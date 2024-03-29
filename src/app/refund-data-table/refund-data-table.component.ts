import { AddRefundCodeDialogComponent } from './../dialog/add-refund-code-dialog/add-refund-code-dialog.component';
import { PaymentDialogComponent } from './../dialog/payment-dialog/payment-dialog.component';
import { RefundItem } from './../shared/item';
import { LanguageService } from './../service/language.service';
import { RefundTableService } from './../service/refund-table.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx'




@Component({
  selector: 'app-refund-data-table',
  templateUrl: './refund-data-table.component.html',
  styleUrls: ['./refund-data-table.component.scss']
})
export class RefundDataTableComponent implements OnInit, AfterViewInit,OnDestroy {
  
  @ViewChild('TABLE')
  Table!: ElementRef;

  @ViewChild(MatTable)
  table!: MatTable<RefundItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;


  selection = new SelectionModel<RefundItem>(true,[]);

  refundReturned = "Müşteriye Para İadesi Yapıldı. (OK)";
  form:FormGroup;
  loading=false;
  dataSource: MatTableDataSource<RefundItem> = new MatTableDataSource();
  private unsubscribe = new Subject<void>();

  
 
  displayedColumns=['PSS_NO','PIS_NO','FTR_TRH','IADE_TRH','MUSAD','BELGE_TOPL','ODEME_TIP_T','PC_TUTAR','IADE_TUTAR', 'KKP_TUTAR','HCEKI','ONAY_KOD','ISLENEN_POS','checkBox']


  constructor(private fb: FormBuilder,
    private refundTableService: RefundTableService,
    private languageService: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) { 
    


    this.form = this.fb.group({
      start: [new Date(), Validators.required],
      end: [new Date(), Validators.required],
      getRefunds: [false, Validators.requiredTrue],
  });
  }

  ngOnInit(): void {
   
  }
  
  get f() {
    return this.form.controls;
  }

  openDialog(flag: boolean) {
    if (this.selection.selected.length < 1) {
      this.languageService.warningToaster("En az bir sipariş seçmelisiniz.")
      return;
    }
 
    if (flag) {
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '60vw',
       data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.submit();
     }

    })
    }
    if (!flag) {
      const dialogRef = this.dialog.open(AddRefundCodeDialogComponent, {
       width: '60vw',
       data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.submit();
     }

    })
    }   
    }



  submit() {   
    this.loading = true;
    const DATAB = this.f['start'].value.toLocaleDateString("en-CA");
    const DATABI = this.f['end'].value.toLocaleDateString("en-CA");
    const refunds = this.f['getRefunds'].value;

    const body =  {
          startDate: DATAB,
          endDate: DATABI,
          refunded: refunds
    }
    
    this.selection.clear();
 
    this.refundTableService.getDatas(body).pipe(takeUntil(this.unsubscribe)).subscribe((res) => { this.dataSource.data = res; this.loading= false  },
      (error) => { this.languageService.errorToaster(error.message); this.loading= false })
       
  }




  
  onRefundToggled(refund: RefundItem):void {
   
    this.selection.toggle(refund);    
    /* console.log(this.selection.selected); */

    
  }
  isAllSelected(): boolean {    
    return this.selection.selected.length == this.dataSource.filteredData.filter((refund) => refund.STATU_T != this.refundReturned).length;
  }

  toggleAll():void{
    if (this.isAllSelected()) {
      this.selection.clear();

    }
    else {
   
    /*this.selection.select(...this.dataSource.connect().value.filter((refund) => refund.STATU_T != this.refundReturned))  sadece gözüken dataları işaretleme*/
      this.selection.select(...this.dataSource.filteredData.filter((refund) => refund.STATU_T != this.refundReturned));

    }  

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  

  }

   
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

   }
  
  filter(input:any) {
    let value = input.target.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();       
  }  

  excel() {
     let excels: Excel[] = [];
 

     this.dataSource.filteredData.forEach(refund => {
       let excel: Excel = {
       PSS_NO : refund.PSS_NO,
       PIS_NO : refund.PIS_NO,
       FaturaTarihi : refund.FTR_TRH,
       IadeTarihi : refund.IADE_TRH,
       AdSoyad : refund.MUSAD,
       BelgeToplam : refund.BELGE_TOPL,
       ÖdemeTipi : refund.ODEME_TIP_T,
       ÇekilenTutar : refund.PC_TUTAR,
       İadeTutar : refund.IADE_TUTAR,
       ParaÇeki : refund.KKP_TUTAR,
       HediyeÇeki : refund.HCEKI,
       İadeOnayKodu : refund.ONAY_KOD,
       İşlenenPost : refund.ISLENEN_POS,
       }
       excels.push(excel);
     })

     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excels);

  // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const filename = 'Refunds' + this.f['start'].value.toLocaleDateString("en-CA")+"/" +this.f['end'].value.toLocaleDateString("en-CA")+'-'+this.f['getRefunds'].value+ '.xlsx';
  XLSX.writeFile(wb, filename);
  }
  

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
}
}
 export interface Excel{
   PSS_NO: number,
   PIS_NO: number,
   FaturaTarihi: string,
   IadeTarihi:string,
   AdSoyad : string;
   BelgeToplam :number;
   ÖdemeTipi : string;
   ÇekilenTutar : string;
   İadeTutar :number;
   ParaÇeki :number;
   HediyeÇeki :string;
   İadeOnayKodu :string;
   İşlenenPost : string;
 }