import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/service/utils/upload.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  fileName: string = '';
  fileURL: string = '';
  userForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl,
    attach: new FormControl()
  })
  constructor(private messageService: MessageService, private userService: UserService, private cookieService: CookieService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.fileName = '';
    this.userService.find(this.cookieService.get('user_Id')).subscribe(
      data => {
        this.user= data;
        this.userForm.controls['Username'].setValue(this.user.username)
        this.userForm.controls['Email'].setValue(this.user.email)
        this.fileURL = this.user.image
        this.fileName = this.user.image
      }
    )
  }

  onUpdate(){
    var image = new FormData();
    if (this.userForm.controls['Image'].value != null) {
      image.append('file', this.userForm.controls['Image'].value);
      this.uploadService.uploadImage(image, 'user').subscribe(
        error => {
          console.log(error)
        }
      );
    }
    this.user.image = this.fileName.replace(" ","%20");
    this.user.id = this.cookieService.get('user_Id');
    this.userService.update(this.user).subscribe(
      data => {
        this.user = data;
        this.messageService.showSuccess('Update success.')
        window.location.reload();
      },
      error => {
        this.messageService.showError('Update failed')
      }
    )
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        this.fileName = file.name;
        this.userForm.patchValue({
          attach: file
        });
    }
   }

}
