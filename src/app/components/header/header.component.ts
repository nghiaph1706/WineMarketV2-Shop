import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/utils/auth.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  checkAdmin: boolean = false;

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAdmin = this.authService.isAdmin()
  }

  onLogout(){
    this.messageService.showWarning("Logout success!")
    this.userService.logout();
  }

}
