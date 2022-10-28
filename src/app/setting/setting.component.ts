import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMessageService } from '../api-message.service';
import { ApiUsersService } from '../api-users.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  isLogin: any = this._ApiUsersService.isLogin.value;
  userID:any = this._ApiUsersService.userID
  name:any= this._ApiUsersService.name.value;
  age:any= this._ApiUsersService.age.value;
  pic:any = this._ApiUsersService.userProfilePic.value;
  responseMessage:any

  private selectedFile: any = null;

  // changePasswordForm = new FormGroup({

  //   password: new FormControl(''),
  //   newPassword: new FormControl(''),
  // });
  constructor(private _ApiUsersService:ApiUsersService, private _ApiMessageService: ApiMessageService, private fb:FormBuilder, private _Router:Router) { 
  }

  changePasswordForm:FormGroup = this.fb.group({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    RePassword: new FormControl('', [Validators.required]),
  },{validators: this.controlValuesAreEqual('newPassword', 'RePassword')});

  updateAccountForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl('', [Validators.required , Validators.min(10), Validators.max(90)])
  })
  private controlValuesAreEqual(password: string, rePassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
      const formGroup = control as FormGroup
      const valueA = formGroup.get(password)?.value
      const valueB = formGroup.get(rePassword)?.value

      if(valueA == valueB){
        return null
      }
      else{
        //alert("Your Password doesn't Match");
       return{valueDoesNotMatch :"Your Password doesn't Match"} 
       
      }
    }
  }

onUpdatePassword(form: any) {

    if (form.valid) {
      this._ApiUsersService.changePassword(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          alert(this.responseMessage);

        }
        ,
        error: (err) => { console.log(err); }
      });
   }else{
    alert(form.errors.valueDoesNotMatch)
   }

  }


  ngOnInit(): void {
    this._ApiUsersService.getUserByID(this.userID);

    this._ApiUsersService.isLogin.subscribe((e) => { 
      this.isLogin = e;
     });  

     this._ApiUsersService.name.subscribe((e) => { 
      this.name = e;
     }); 

     this._ApiUsersService.age.subscribe((e) => { 
      this.age = e;
     });
   
     this._ApiUsersService.targetUser.subscribe( (res) => {
       this.userID= res;
     });
 
     this._ApiUsersService.userProfilePic.subscribe( (res) => {
       this.pic = res;
     });
  }

  openUploadImage() {

    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
   const formData = new FormData()
   formData.append('image', this.selectedFile)
   this._ApiUsersService.updateImg(formData).subscribe({
    next: (response) => {
      //localStorage.setItem('token', response.token);
      this._ApiUsersService.getCurrentUser()
    },
    error: (err) =>{
      console.log(err);
    }
  })

  }

  onUpdateAccount(form: any) {
    if (form.valid) {
      this._ApiUsersService.updateAccount(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token);
          alert(this.responseMessage + ', Please Login again to update');
          this._ApiUsersService.logOut();
          this._Router.navigate(['/login'])
        }
        ,
        error: (err) => { console.log(err); }
      });
   }else{
    alert("Please enter your name and age")
   }

  }


  
}
