import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../models/User.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss']
})
export class ManageCustomersComponent implements OnInit, OnDestroy {


  users: User[];
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.getAllCustomers().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users);
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
