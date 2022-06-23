import { LanguageService } from './../language.service';
import { Router } from '@angular/router';
import { User } from '../../shared/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private router:Router,private langageService:LanguageService) { }


  
  login(user: User) {
    this.langageService.successToaster('Giriş Yapıldı.')
    this.isLoggedIn.next(true);    
    this.router.navigate(['/refund-data-table']);
  /*   setTimeout(() => {
      this.isLoggedIn.next(true);    
      this.router.navigate(['/refund-data-table']);
    },2000) */
   
  }
  logout() {
    this.isLoggedIn.next(false);
  }

}
