import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'http://localhost:8080/api/v1/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService, private route: Router, private authService: AuthService) { }

  login(data: any): Observable<any>{
    return this.http.post<any>(_api + 'login', data);
  }

  logout(){
    this.cookieService.delete('token');
    this.cookieService.delete('user_Id');
    this.cookieService.delete('cart_Id');
    this.cookieService.delete('isAdmin');
    this.route.navigate(['']);
  }

  signup(data: any): Observable<any>{
    return this.http.post<any>(
      _api + 'signup', 
      data);
  }

  sendcode(data: any): Observable<any>{
    return this.http.post<any>(_api + 'sendcode', data);
  }

  forgot(data: any): Observable<any>{
    return this.http.put<any>(_api + 'forgot', data);
  }

  find(user_Id: string): Observable<User>{
    return this.http.get<User>(
      _api + user_Id, 
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  update(data: any): Observable<User>{
    return this.http.put<User>(
      _api, 
      data,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

}
