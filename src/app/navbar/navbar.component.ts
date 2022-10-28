import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMessageService } from '../api-message.service';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: any = this._ApiUsersService.isLogin.value;
  userID:any = this._ApiUsersService.userID
  name:any= this._ApiUsersService.name.value;
  pic:any = this._ApiUsersService.userProfilePic.value;

  constructor(private _ApiUsersService:ApiUsersService, private _ApiMessageService: ApiMessageService, private _Router: Router) { 
  }


  ngOnInit(): void {
    //this._ApiUsersService.getUserByID(this.userID);
    this._ApiUsersService.isLogin.subscribe((e) => { 
      this.isLogin = e;
     });  

     this._ApiUsersService.name.subscribe((e) => { 
      this.name = e;
     }); 

     this._ApiUsersService.userProfilePic.subscribe( (res) => {
       this.pic = res;
     });
  }

  logOut() {
    this._ApiMessageService.logOut();
    this.isLogin = null;
    this.userID = null;
    this.pic = '';
    this._Router.navigate(['/login'])
  }

}
