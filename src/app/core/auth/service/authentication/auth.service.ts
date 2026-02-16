import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { userDataResponse } from '../../model/user/user-data.interface';
import { jwtDecode } from "jwt-decode";
import { STORED_KEYS } from '../../../constants/storedKeys';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient=inject(HttpClient);
  private readonly router=inject(Router);
  sendRegisterData(userdata:object):Observable<userDataResponse>{
    return this.httpClient.post<userDataResponse>(environment.base_url + 'auth/signup', userdata)
  }
  sendLoginData(userdata:object):Observable<userDataResponse>{
    return this.httpClient.post<userDataResponse>(environment.base_url + 'auth/signin', userdata)
  }
  decodeUserToken():void{
if( localStorage.getItem(STORED_KEYS.userToken)){
  const token= localStorage.getItem(STORED_KEYS.userToken)!;
  const decoded = jwtDecode(token);

console.log(decoded);
  }
}
userLogOut():void{
  localStorage.removeItem(STORED_KEYS.userToken);
this.router.navigate(['/login'])

}
}