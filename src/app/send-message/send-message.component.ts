import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { __values } from 'tslib';
import { ApiMessageService } from '../api-message.service';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  responseMessage:any
  userID:any 
  user:any = this._ApiUsersService.targetUser.value;
  profilePicture: any = this._ApiUsersService.userProfilePic.value
  location:any = window.location.origin;
  constructor(private _ApiMessageService:ApiMessageService, private _ApiUsersService:ApiUsersService, private  _Router:ActivatedRoute) { }

  sendMessageForm = new FormGroup({
    message: new FormControl(''),
  });
  
  onSubmit(form:any){
    if(form.valid == true){
      this._ApiMessageService.sendMessages(form.value, this.userID).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          if(response.message == 'Message added Successfully'){
            console.log(form)
            this.sendMessageForm.setValue({message: ''});
            //this.sendMessageForm.controls['message'] = ''
          }
        }
      ,
      error: (err) => {console.log(err);}
     });
     }
  }

  // getUserByID(id:any){
  //   this._ApiUsersService.getUserByID(id).subscribe({
  //     next: (response) =>{
  //       this.user = response
  //       console.log(this.user.pic)
  //     },
  //     error: (err) => {console.log(err);}
  //   });
  // }

  ngOnInit(): void {
    this.userID = this._Router.snapshot.paramMap.get('id');
    this._ApiUsersService.getUserByID(this.userID);
    this._ApiUsersService.targetUser.subscribe( (res) => {
      this.user = res;
    });

    this._ApiUsersService.userProfilePic.subscribe( (res) => {
      this.profilePicture = res;
    });
  }
}
