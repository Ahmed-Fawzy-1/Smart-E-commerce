import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { log } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
[x: string]: any;

  private readonly formBuilder = inject(FormBuilder)
private readonly authService = inject(AuthService)
private readonly cookieService = inject(CookieService)
private readonly router = inject(Router)




  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword !:FormGroup;

step:number = 1; 

  ngOnInit(): void {
      this.initForm();
  }

  initForm():void{
    this.verifyEmail = this.formBuilder.group({
      email:[null , [Validators.required , Validators.email]]
    })
   
    
this.verifyCode = this.formBuilder.group({
      resetCode:[null , [Validators.required ]]
    })
   
    

        
this.resetPassword = this.formBuilder.group({
      email:[null , [Validators.required , Validators.email]],
      newPassword:[null ,[Validators.required ,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)] ]
    })
   
    

  }
formStep1():void{

  if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step = 2;
      
    }
  })
    
  }
}


formStep2():void{

  if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step = 3;
      
    }
  })
    
  }
}

formStep3():void{

  if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res);

      this.cookieService.set('token' , res.token)

      this.router.navigate(['/home'])
      
    }
  })
    
  }
}

}
