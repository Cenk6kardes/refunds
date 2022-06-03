import { AuthService } from '../../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  showPassword = false
 

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private elementRef:ElementRef) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,5}$')]],
      password: ['', [Validators.required,Validators.minLength(4)]],
    });
    
   }

  ngOnInit(): void {
  

  }

  get f() {
    return this.loginForm.controls;
  }
  
  togglePasswordVisible() {
    this.showPassword = !this.showPassword;
  }


  submit() {    
    // console.log(this.f['email'].value);
    // console.log(this.f['password'].value);
  /*   console.log(this.loginForm.getRawValue()); */
    /*  localStorage.setItem("user", JSON.stringify(this.loginForm.getRawValue()));     */
    this.authService.login(this.loginForm.getRawValue());
  }
  /* 
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
    .body.style.background = 'url(/assets/image/background/dark-material-bg.jpg ) !important';
  } */
  
}
