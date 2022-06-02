import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
 
  constructor(private toaster:ToastrService) { }
  successToaster(msg:string){
      this.toaster.success(msg)
  }
  infoToaster(msg:string){
      this.toaster.info(msg)
  }
  warningToaster(msg:string){
      this.toaster.warning(msg)
  }
  errorToaster(msg:string){
      this.toaster.error(msg)
  }

}
