import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathguardGuard implements CanActivate {
  constructor(private router:Router){}
  
  canActivate(): boolean{
    if(localStorage.getItem('token') !== null){
      return true
    }
    
    else{   
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
