import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Fixed styleUrl to styleUrls
})
export class SignupComponent {
  constructor(private fb: FormBuilder,
    private router: Router,
    private servicesService:ServicesService,
    private messageService: MessageService
  ) { }

  submit = false;


  signup = this.fb.group({
    firstname: ['', Validators.required],
    phone: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/),Validators.minLength(10)]],
    password: ['', Validators.required],
  });

  get f() {
    return this.signup.controls;
  }

  onSubmit() {
    
    this.submit = true;
    console.log(this.signup.controls);
    
    if (this.signup.valid) {
     const data = this.signup.getRawValue()
     console.log('data',data.firstname)

     this.servicesService.signup(data.firstname as string,data.phone as string,data.password as string)
     .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'Signup successful!'});     
      },
      error:(err)=>{
console.log(err)
 if (err.error && err.error.message) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred during signup.' });
  }
      }
     })
   
    }
    console.log('Form data:', this.signup.value);
  }
}
