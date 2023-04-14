import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { GradientConfig } from '../../../../../app-config';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public gradientConfig: any;
  nameUser: string;

  constructor(private auth: AuthService,
              private route: Router) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;

    this.nameUser = auth.getDataUsuario().username;
  }

  ngOnInit() {
  }

  onChatToggle(friendID) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('elite-rtl')) {
      this.gradientConfig['rtl-layout'] = true;
    } else {
      this.gradientConfig['rtl-layout'] = false;
    }
  }

  logOut(): void {
    this.auth.logout();
    this.route.navigateByUrl('/login');
  }

  profile(): void {
    const userData = this.auth.getDataUsuario();
    console.log(userData);
    this.route.navigateByUrl('/systemUser/update/' + userData.id);
  }
}
