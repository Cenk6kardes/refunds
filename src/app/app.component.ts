import { LanguageService } from './service/language.service';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ebebek-refund';
  isLoggedIn!:Observable<boolean>
  constructor(private authService: AuthService, private toastr:LanguageService) {
    this.isLoggedIn = this.authService.isLoggedIn;
   }
  
  logout() {
    this.authService.logout();
    this.toastr.successToaster("Logged Out")
  }
  

}
