import { Component } from '@angular/core';
import {FormBuilder,FormArray, Validators} from "@angular/forms"
import { ServicesService } from '../services.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
constructor(private fb:FormBuilder,
  private servicesService:ServicesService,
  private messageService:MessageService,
  private router:Router,
){}

submit = false;

loginForm = this.fb.group({
  phone:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/),Validators.minLength(10)]],
  password:['',Validators.required],
})

get f(){
  return this.loginForm.controls;
}


onSubmit(){
  console.log(this.loginForm.value)
  this.submit= true
  if(this.loginForm.valid){
    const data  = this.loginForm.getRawValue();

    this.servicesService.login(data.phone as string, data.password as string)
    .subscribe({
      next:(res:any) =>{
        console.log('res',res)
        localStorage.setItem('token',res.token)
        console.log('adad',res.token)
        this.messageService.add({ detail:'login successful!'});
        this.router.navigateByUrl('')

      },
      error:(err)=>{
        if (err.error && err.error.message) {
          this.messageService.add({  detail: err.error.message });
        } else {
          this.messageService.add({  detail: 'An error occurred during login.' });
        }
      } 
    })
  }
}
}
