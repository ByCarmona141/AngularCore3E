import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-reset-password',
    templateUrl: './auth-reset-password.component.html',
    styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    regresar() {
        this.route.navigateByUrl('/login');
    }
}
