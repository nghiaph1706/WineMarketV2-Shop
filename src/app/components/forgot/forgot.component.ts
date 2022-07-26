import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  message: string = '';
  username: string = '' + sessionStorage.getItem('username');
  email: string = '' + sessionStorage.getItem('email');
  code: string = '' + sessionStorage.getItem('code');
  user: User;
  forgotForm: FormGroup = new FormGroup({
    Password: new FormControl,
    Repassword: new FormControl,
    Code: new FormControl
  })
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.message = '';
  }

  onForgot() {
    if (this.forgotForm.controls['Password'].value === this.forgotForm.controls['Repassword'].value) {
      if (this.forgotForm.controls['Code'].value === this.code) {
        this.user = new User('', this.username, this.forgotForm.controls['Repassword'].value,'','',false)
        this.userService.forgot(this.user).subscribe(
          data => {
            this.message = 'Change password success. Please login.'
            this.route.navigate(['/login'])
          },
          error => {
            this.message = 'Change password failed.'
          }
        )
      } else {
        this.message = 'Change password failed. Invalid code.'
      }
    } else {
      this.message = 'Change password failed. Password and Repassword does not match.'
    }
  }

}
