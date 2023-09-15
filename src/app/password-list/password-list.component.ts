import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId !: string;
  siteName !: string;
  siteURL !: string;
  siteImgURL !: string;

  passwordList !: Observable<Array<any>>;

  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;

  formState: string = 'Add new';

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.name;
      this.siteURL = val.url;
      this.siteImgURL = val.imgURL;
    });

    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
    this.formState = 'Add new';
  }

  onSubmit(values: object) {

    if (this.formState === 'Add new') {
    this.passwordManagerService.addPassword(values, this.siteId).then(() => {
      this.showAlert('Data Added');
      this.resetForm();
    }).catch((error) => {
      console.log(error);
    });
  } else if (this.formState === 'Edit') {
    this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values).then(() => {
      this.showAlert('Data Updated');
      this.resetForm();
    }).catch((error) => {
      console.log(error);
    });
  }
}

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId)

  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.passwordId = passwordId;
    this.password = password;

    this.formState = 'Edit';

  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId).then(() => {
      this.showAlert('Data Deleted');
    }).catch((error) => {
      console.log(error);
    });
  }
}
