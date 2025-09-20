import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  subscription: Subscription = new Subscription();

  msgError: string = '';

  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }
  // submit():void{
  //   console.log(this.email)
  // }

  // loginForm:FormGroup= new FormGroup({

  //   email:new FormControl(null , [Validators.required, Validators.email]),
  //   password:new FormControl(null , [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),

  // });

  loginForm!: FormGroup;

  // initForm(): void {
  //   this.fb.group({
  //     email: [null, [Validators.required, Validators.email]],
  //     poassword: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]]
  //   })
  // }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
    });
  }

  // Ex validation (if needed):
  // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"

  submitForm(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.cookieService.set('token', res.token);

            this.authService.decodeToken();

            setTimeout(() => {
              this.msgError = '';
              this.router.navigate(['/home']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
