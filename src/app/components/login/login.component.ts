import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private messageService: MessageService, private userService: UserService, private cookieService: CookieService, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        this.cookieService.set('token', data.token);
        this.cookieService.set('user_Id', data.userId);
        this.cookieService.set('cart_Id', data.cartId);
        this.cookieService.set('isAdmin', data.isAdmin);
        this.messageService.showSuccess(this.translate.instant('notiLoginSuccess'))
        window.location.reload();
      },
      error => {
        this.messageService.showError(this.translate.instant('notiLoginError'))
      }
    )
  }

}
