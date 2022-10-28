import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiMessageService } from '../api-message.service';
import { ApiUsersService } from '../api-users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  favourite:boolean = false;
  messages:any
  elemntID:boolean[] = []
  userID:any;
  location:any = window.location.origin;

  //@ViewChild('like',{static:false}) likeBtn!:ElementRef<HTMLElement>
   //myTag:any = this.el.nativeElement.querySelector("i");
  constructor(private _ApiUsersService:ApiUsersService, private _ApiMessageService: ApiMessageService, private  _Router:Router) {
     this._ApiUsersService.getCurrentUser()
     this._ApiUsersService.getUserByID(this.userID)
     this.userID =this._ApiUsersService.userID
     this._ApiMessageService.getStart()
     this.getMessages();
   }


   getMessages() {
    this._ApiMessageService.getMessages().subscribe({
      next: (response) => {

        if (response.message == 'success' ) {
          this.messages = '';
          this.messages = response.messages;
          for(let i=0; i<response.messages.length; i++){
            this.elemntID[i] = response.messages[i].favourite
          }
        }

      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  

  updateMessageStatus(messageID:any, index:any){
    this.favouriteMessage(index);
    let messageData = {'messageID':messageID, 'favourite':this.elemntID[index]}
    this._ApiMessageService.updateMessageStaus(messageData).subscribe({
      next: (response) => {

        if (response.message == 'updated success' ) {
          this.getMessages();
        }

      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  favouriteMessage(index:any){
    this.favourite = !this.favourite
    this.elemntID[index] =!this.elemntID[index]  
  }

  ngOnInit(): void {

 }
}
