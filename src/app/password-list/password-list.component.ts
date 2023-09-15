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

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.name;
      this.siteURL = val.url;
      this.siteImgURL = val.imgURL;
    });

    this.loadPasswords
  }

  onSubmit(values: object) {
    this.passwordManagerService.addPassword(values, this.siteId).then(() => {
      console.log('Password Added');
    }).catch((error) => {
      console.log(error);
    });
  }

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId)

  }
}
