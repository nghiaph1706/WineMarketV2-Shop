import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/service/cart/cart.service';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private messageService: MessageService, private userService: UserService, private cookieService: CookieService, private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.cookieService.set('token', data.token);
        this.cookieService.set('user_Id', data.userId);
        this.cookieService.set('cart_Id', data.cartId);
        this.cookieService.set('isAdmin', data.isAdmin);
        this.messageService.showSuccess('Login success!')
        window.location.reload();
      },
      error => {
        this.messageService.showError('Login failed. Please try again.')
      }
    )
  }

}
