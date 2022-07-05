import { RefundItem } from './../shared/item';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ThisReceiver } from '@angular/compiler';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RefundTableService {
  
  
    constructor(private http: HttpClient) {
      
   }

    
    getDatas(body: any) {

       
         var queryString = Object.keys(body).map((key) => {
            return key + '=' + body[key]
        }).join('&');
     
       return this.http.get<RefundItem[]>(environment.path+'?'+queryString) 
    }
    
    confirmPayment(refunds: RefundItem[]) {

    
      const refundsPay = refunds.map((refund) => {
          
            return {
                order_no: refund.PSS_NO.toString(),
                invoice_no: refund.PIS_NO.toString(),
                order_date: refund.SIP_TRH,
                total_amount: refund.BELGE_TOPL,
                refund_amount: refund.IADE_TUTAR,
                processed_pos:1
             }                
            
        })
        
        return this.http.post(environment.path, refundsPay);
    }
  

  
  confirmCode(refunds: RefundItem[]) {
    const refundsCode = refunds.map((refund) => {
      return {
        PIS_NO: refund.PIS_NO.toString(),
        ONAY_KOD: refund.ONAY_KOD,
        ISLENEN_POS:"1"
        }

    })
    
     return this.http.post(environment.path + "/save",refundsCode) as Observable<codeResponse>

  
  }
}


export interface codeResponse{
  failureList: Array<any>|null,
  successList: Array<any>|null
}