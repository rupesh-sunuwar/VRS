import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../service/user/user.service";
import {LoginService} from "../auth/login.service";

@Component({
  selector: 'app-view-user-ky',
  templateUrl: './view-user-ky.component.html',
  styleUrls: ['./view-user-ky.component.scss']
})
export class ViewUserKyComponent {

  data: any;
  frontImage: any;
  backImage: any;

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {

    this.router.params.subscribe(params => {
      const userId = params['id'];
      console.log(this.loginService.getUserId())
      this.userService.getUserKyc(this.loginService.getUserId())
        .subscribe((data: any) => {
          this.data = data;
          this.frontImage = 'data:image/jpg;base64,' + data.citizenFront;
          this.backImage = 'data:image/jpg;base64,' + data.citizenBack;
        });
    });
  }

  goBack() {
    this.location.back();
  }
}
