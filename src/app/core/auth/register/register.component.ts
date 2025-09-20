import { AuthService } from './../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  flag: boolean = true;

  msgError: string = '';

  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }
  // submit():void{
  //   console.log(this.email)
  // }

  // registerForm:FormGroup= new FormGroup({

  //   name:new FormControl(null , [Validators.required, Validators.minLength(2) , Validators.maxLength(20)]),
  //   email:new FormControl(null , [Validators.required, Validators.email]),
  //   password:new FormControl(null , [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  //   rePassword:new FormControl(null , [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  //   phone:new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // }, {validators: this.confirmPassword});

  registerForm!: FormGroup;

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.confirmPassword }
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.regiseterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            setTimeout(() => {
              this.msgError = '';
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000);
            });
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    // let password = group.get('password')?.value
    // let rePassword = group.get('rePassword')?.value

    // if (password === rePassword) {
    //   return null ;
    //   }else {
    //     return {mismatch : true}
    //   }
  }
}
