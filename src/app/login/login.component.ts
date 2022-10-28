import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _ApiUsersService:ApiUsersService ,private  _Router:Router) {
   
   }


  registerationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  responseMessage:any


  ngOnInit(): void {
  }

  onSubmit(form:any){
    if(form.valid == true){  
      this._ApiUsersService.signIn(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          //console.log(this.responseMessage)
          if(response.message == 'signin success'){
            localStorage.setItem('token', response.token);
            //this._ApiUsersService.getCurrentUser()
            this._Router.navigate(['/home'])
          }
          
        }
      ,
      error: (err) => {console.log(err);}
     });
     }
  }


}
