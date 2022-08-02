import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/entity/cart.entity';
import { CartService } from 'src/app/service/cart/cart.service';
import { CartDetailsService } from 'src/app/service/cartDetails/cart-details.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartDetailsList: Array<any> = new Array()
  cart: Cart
  constructor(private cartDetailsService: CartDetailsService, private cartService: CartService, private cookieService: CookieService, private route: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartDetailsService.findByCartId(this.cookieService.get('cart_Id')).subscribe(
      data => {
        this.cartDetailsList = data;
        console.log(this.cartDetailsList)
      }
    )
    this.cartService.find(this.cookieService.get('cart_Id')).subscribe(
      data => {
        this.cart = data;        
      }
    )
  }

  checkout(){
    var user_Id = new FormData()
    user_Id.append('user_Id', this.cookieService.get('user_Id'))
    this.cartService.checkout(this.cookieService.get('cart_Id'), user_Id).subscribe(
      data => {
        this.cookieService.set('cart_Id', data.cartId)
        this.cart = new Cart
        this.cartDetailsList = new Array()
        this.messageService.showSuccess("Checkout Success!")
      }
    )
  }

}
