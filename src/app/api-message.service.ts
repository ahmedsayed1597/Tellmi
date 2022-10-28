import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ApiUsersService } from './api-users.service';


@Injectable({
  providedIn: 'root'
})
export class ApiMessageService {
  token:any 
  userID:any

  constructor(private _HttpClient: HttpClient, private _ApiUsersService:ApiUsersService) { 
    this._ApiUsersService.getCurrentUser()
    this.token = this._ApiUsersService.token
    this.userID = this._ApiUsersService.userID
    //this.getCurrentUser()
  }

  getStart(){
    this._ApiUsersService.getCurrentUser()
    this.token = this._ApiUsersService.token
    this.userID = this._ApiUsersService.userID
  }

  getMessages(): Observable<any> {
    return this._HttpClient.get('https://tellmenode.herokuapp.com/messages/getMessage',{
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token,
        'userID': this.userID
      }),
    });
  }

  sendMessages(form:any, id:any): Observable<any> {
    let queryParams = new HttpParams();
    return this._HttpClient.post('https://tellmenode.herokuapp.com/messages/addMessage', form, {params:queryParams.set('id', id)});
  }

  getFavouriteMessages(): Observable<any> {
    return this._HttpClient.get('https://tellmenode.herokuapp.com/messages/getFavouriteMessage',{
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token,
        'userID': this.userID
      }),
    });
  }

  updateMessageStaus(messageData:any): Observable<any> {
    return this._HttpClient.patch('https://tellmenode.herokuapp.com/messages/updateStatus', messageData,{
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token,
        'userID': this.userID
      }),
    });
  }

  logOut(){
    this.token = null;
    this.userID = null;
    this._ApiUsersService.logOut();
    this._ApiUsersService.getCurrentUser();
  }

}
