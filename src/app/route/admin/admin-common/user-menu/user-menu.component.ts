import { User } from 'src/app/model/user.model';
import { SessionService } from '../../../../service/authService/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  user:         User = new User();

  constructor(sessionService: SessionService) {

    this.user =  sessionService.load()

  }

  ngOnInit(): void {
  }

}
