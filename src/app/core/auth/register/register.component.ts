import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { AuthService } from '../service/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)
 
  private readonly fb=inject(FormBuilder)
  errorMessage:WritableSignal<string>=signal<string>('')
      isLoading:WritableSignal<boolean>=signal<boolean>(false)
registerForm !:FormGroup;
refSubscription:Subscription=new Subscription()
ngOnInit(): void {
  this.registerFormInit()
}

registerFormInit():void{
  this.registerForm=this.fb.group({
 name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required ,Validators.email]],
password:[null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]],
rePassword: [null,[Validators.required]],
 phone:[null,[Validators.required,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]]


  },{ validators:this.handleConfirmPssword},)
}


handleConfirmPssword(group:AbstractControl){
  let password=group.get('password')?.value;
    let rePassword=group.get('rePassword')?.value;
    if(password === rePassword){
      return null;
    }
    else{
      return{mismatch:true};
    }
}



submitRegisterForm():void{

if(this.registerForm.valid){
this.isLoading.set(true)

this.refSubscription.unsubscribe()

this.refSubscription=this.authService.sendRegisterData(this.registerForm.value ).subscribe({
  next:(res)=>{
if (res.message === 'success') {
this.isLoading.set(false);
this.registerForm.reset()
this.errorMessage.set('')
setTimeout(() => {
  this.router.navigate(['/login/'])
}, 1000);
}
  },
  error:(err:HttpErrorResponse)=>{
    console.log(err);
    this.isLoading.set(false)

this.errorMessage.set(err.error?.message)
  }
})
}
else{
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
});
this.showFirstError()
}
}
showFirstError():void{
  const controls=this.registerForm.controls;
  for(const controlName in controls){
    const control= controls [controlName]
    if(control.invalid){
      control.markAllAsTouched();
    break;
    }
  }
}
}

