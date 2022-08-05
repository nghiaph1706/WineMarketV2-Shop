import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'WineMarketV2';

  constructor(public translate: TranslateService, private cookieService: CookieService){}
  ngOnInit(): void {
    this.translate.addLangs(['en', 'vn'])
    if (this.cookieService.get("locale") != '') {
      this.translate.setDefaultLang(this.cookieService.get("locale"))
    } else {
      this.translate.setDefaultLang('en')
      this.cookieService.set("locale",'en')
    }
  }
}
