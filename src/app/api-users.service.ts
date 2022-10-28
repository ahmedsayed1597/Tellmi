import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  url:any = "https://tellmenode.herokuapp.com/"
  isLogin = new BehaviorSubject(null);
  token:any
  userID:any 
  name = new BehaviorSubject(null);
  age = new BehaviorSubject(null);
  pic_url = new BehaviorSubject(null);
  targetUser = new BehaviorSubject(null);
  userProfilePic = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {
    this.getCurrentUser()
   }

  signUp(userData: any): Observable<any> {
    return this._HttpClient.post('https://tellmenode.herokuapp.com/users/signup', userData);
  }

  signIn(userData: any): Observable<any> {
    return this._HttpClient.post('https://tellmenode.herokuapp.com/users/signin', userData);
  }



  getUserByIDFromDatabase(userID: any): Observable<any> {
    return this._HttpClient.get('https://tellmenode.herokuapp.com/users/getUserByID', {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
        'userID': userID
      }),
    });
  }

  getUserByID(id:any){
    this.getUserByIDFromDatabase(id).subscribe({
      next: (response) =>{
        this.targetUser.next(response.user)
        this.userProfilePic.next(response.pic)
      },
      error: (err) => {console.log(err);}
    });
  }
  
  updateImg(userPicDates:any) : Observable<any> {
    return this._HttpClient.post('https://tellmenode.herokuapp.com/users/uploadImg',userPicDates,{
      headers : new HttpHeaders({
        'token': this.token,
        'userID': this.userID
      }),
    })

  }

  getCurrentUser(){
    if(localStorage.getItem('token') != null){ 
      this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isLogin.next(this.token);
         let token_decode: any = jwtDecode(this.token);
         this.userID =token_decode.userid;
         this.name.next(token_decode.name);
         this.age.next(token_decode.age);
         this.userProfilePic.next(token_decode.user_pic)  
      }
    }
    else{
      console.log('token not found')
    }
}

  changePassword(userData: any): Observable<any> {
    return this._HttpClient.put('https://tellmenode.herokuapp.com/users/changePassword', userData, {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',

        'token': this.token

      }),
    });
}

updateAccount(userData: any): Observable<any> {
  return this._HttpClient.put('https://tellmenode.herokuapp.com/users/accountUpdate', userData, {
    headers : new HttpHeaders({

      'Content-Type': 'application/json',

      'token': this.token

    }),
  });
}

logOut() {
  localStorage.removeItem('token');
  this.userID = null;
  this.token = null;
  this.isLogin.next(null);
  this.name.next(null);
  this.age.next(null)
  this.pic_url.next(null);
}
}


