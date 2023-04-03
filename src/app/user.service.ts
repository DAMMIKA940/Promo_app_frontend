import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient,private _router:Router) { }

  getAllUsers(){
    return this.http.get<any>('https://promoapp-prod.up.railway.app/user/getUsers')
  }
loginUser(user:any){
  return this.http.post<any>('https://promoapp-prod.up.railway.app/admin/login',user)
}
deleteUser(id: any) {
    return this.http.delete('https://promoapp-prod.up.railway.app/user/deleteUser/'+id);
  }

adminloggedin(){
    return !!localStorage.getItem('token')
  }

  logoutAdmin(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

}
