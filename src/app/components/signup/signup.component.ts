import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  user: User;
  signupForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Repassword: new FormControl('', Validators.required)
  })
  constructor(private messageService: MessageService, private userService: UserService, private route: Router, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  onSignup(){
    if (this.signupForm.controls['Password'].value === this.signupForm.controls['Repassword'].value) {
      this.user = new User('',this.signupForm.controls['Username'].value, this.signupForm.controls['Repassword'].value, this.signupForm.controls['Email'].value, 'null.png', false)
      this.userService.signup(this.user).subscribe(
        data => {
          this.messageService.showSuccess(this.translate.instant('notiSignupSuccess'))
          this.route.navigate(['/login'])
        },
        error => {
          this.messageService.showError(this.translate.instant('notiSignupError'))
        }
      )
    } else {
      this.messageService.showError(this.translate.instant('notiSignupError'))
    }
  }

}
