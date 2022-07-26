import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/entity/cart.entity';
import { CartDetails } from 'src/app/entity/cartDetails.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'http://localhost:8080/api/v1/cart/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  find(cart_Id: string): Observable<Cart> {
    return this.http.get<Cart>(
      _api + cart_Id,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  checkout(cart_Id: string, data: any): Observable<any>{
    return this.http.post<Cart>(
      _api + 'checkout/' + cart_Id,
      data,
      {
        headers: this.authService.getHeaders()
      }
    )
  }
}
