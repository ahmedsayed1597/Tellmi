import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from '../api-message.service';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-favourite-message',
  templateUrl: './favourite-message.component.html',
  styleUrls: ['./favourite-message.component.css']
})
export class FavouriteMessageComponent implements OnInit {

  favourite:boolean = false;
  messages:any
  elemntID:boolean[] = []

  constructor(private _ApiUsersService:ApiUsersService, private _ApiMessageService: ApiMessageService) {
    this._ApiUsersService.getCurrentUser();
    this.getFavouriteMessages();
   }

   getFavouriteMessages() {
    this._ApiMessageService.getFavouriteMessages().subscribe({
      next: (response) => {

        if (response.message == 'success' ) {
          this.messages = '';
          this.messages = response.messages;
          for(let i=0; i<response.messages.length; i++){
            this.elemntID[i] = response.messages[i].favourite
          }
          console.log(response)
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
          this.getFavouriteMessages();
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
