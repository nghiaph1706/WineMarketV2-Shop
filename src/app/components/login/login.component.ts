import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  message: string = '';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private userService: UserService, private cookieService: CookieService, private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.message = '';
  }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.cookieService.set('token', data.token);
        this.cookieService.set('user_Id', data.userId);
        this.cookieService.set('cart_Id', data.cartId);
        this.message = 'Login Success';
        this.route.navigate(['']);
      },
      error => {
        this.message = 'Login Failed';
      }
    )
  }

}
