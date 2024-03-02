import {Component} from '@angular/core';
import {UserDto} from "../../model/user-dto";
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent {

  users: UserDto[] = [];

  constructor(private userService: LoginService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}
