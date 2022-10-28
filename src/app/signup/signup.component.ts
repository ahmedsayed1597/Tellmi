import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required , Validators.min(10), Validators.max(90)]),
    password: new FormControl('', [Validators.required]),
  });
  
  responseMessage:any
  constructor(private _ApiUsersService:ApiUsersService ,private  _Router:Router) { 
  }

  ngOnInit(): void {
    if (this.routeHomeIfUserExist()) {
      this._Router.navigate(['/home']);
    }
  }

  onSubmit(form:any){
    if(form.valid == true){
      
      this._ApiUsersService.signUp(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          console.log(this.responseMessage)
          if(response.message == 'signup success'){
            this._Router.navigate(['login'])
          }
        }
      ,
      error: (err) => {console.log(err);}
     });
     }
  }

  routeHomeIfUserExist(): boolean {
    if (localStorage.getItem('token') !== null) { return true; }
    else {
      return false
    }
  }
}
