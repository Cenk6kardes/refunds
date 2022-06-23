import { RefundItem } from './../shared/item';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class RefundTableService {
  getPath = "SEND_DATA"
  
    constructor(private http: HttpClient) {
      
   }

    
    getDatas(body: any) {

       
         var queryString = Object.keys(body).map((key) => {
            return key + '=' + body[key]
        }).join('&');
     
       return this.http.get<RefundItem[]>(environment.path+'?'+queryString) 
    }
    
    // "order_no": "5425774401",
    // "invoice_no": "7000208805",
    // "order_date": "2022-01-18",
    // "total_amount": 89.97,
    // "refund_amount": 0.0,
    // "processed_pos": 1

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

}
