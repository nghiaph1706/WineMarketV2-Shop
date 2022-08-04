import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  username: string = '' + sessionStorage.getItem('username');
  email: string = '' + sessionStorage.getItem('email');
  code: string = '' + sessionStorage.getItem('code');
  user: User;
  forgotForm: FormGroup = new FormGroup({
    Password: new FormControl('', Validators.required),
    Repassword: new FormControl('', Validators.required),
    Code: new FormControl('', Validators.required)
  })
  constructor(private messageService: MessageService, private userService: UserService, private route: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  onForgot() {
    if (this.forgotForm.controls['Password'].value === this.forgotForm.controls['Repassword'].value) {
      if (this.forgotForm.controls['Code'].value === this.code) {
        this.user = new User('', this.username, this.forgotForm.controls['Repassword'].value, '', '', false)
        this.userService.forgot(this.user).subscribe(
          data => {
            this.messageService.showSuccess(this.translate.instant('notiChangePasswordSuccess'))
            this.route.navigate(['/login'])
          },
          error => {
            this.messageService.showError(this.translate.instant('notiChangePasswordError'))
          }
        )
      } else {
        this.messageService.showError(this.translate.instant('notiChangePasswordError'))
      }
    } else {
      this.messageService.showError(this.translate.instant('notiChangePasswordError'))
    }
  }

}
