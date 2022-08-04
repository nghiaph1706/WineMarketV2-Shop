import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/utils/auth.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  checkAdmin: boolean = false
  checkLogin: boolean = false

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService, private cookieService: CookieService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.checkAdmin = this.authService.isAdmin()
    this.checkLogin= this.authService.isLogin()
  }

  onLogout(){
    this.messageService.showWarning(this.translate.instant('notiLogoutSuccess'))
    this.userService.logout();
  }

  switchLanguage(lang: string){
    this.cookieService.set("locale", lang)
    this.translate.use(lang)
  }

}
