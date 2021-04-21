import { User } from 'src/app/model/user.model';
import { SessionService } from './../../../service/authService/session.service';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

  mobileQuery:  MediaQueryList;

  user:         User = new User();

  fillerNav = [
    { name: 'Home',         route: 'home',          icon: 'home'},
    { name: 'Building',     route: 'building',      icon: 'house'},
    { name: 'Apartment',    route: 'apartment',     icon: 'house'},
    { name: 'Document',     route: 'document',      icon: 'insert_drive_file'},
    { name: 'User',         route: 'user',          icon: 'supervisor_account'},
    { name: 'Role',         route: 'role',          icon: 'rule'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, sessionService: SessionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.user =  sessionService.load()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
