import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../auth/services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../auth/models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user$: Observable<User | null> | undefined;

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
      this.user$ = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

}
