import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { systemName } from '../../../../../environments/environment';
import { Login } from '../../interfaces/login';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    signInForm: FormGroup;
    remember = false;
    error = false;
    public userData: JSON;
    login = false;

    constructor(private auth: AuthService,
                private router: Router,
                private builder: FormBuilder) {
        if (this.auth.isLogged()) {
            this.router.navigateByUrl('/');
        }
    }

    ngOnInit(): void {
        let username = '';
        if (localStorage.getItem(systemName + 'Remember')) {
            this.remember = true;
            username = localStorage.getItem(systemName + 'Remember');
        }

        this.signInForm = this.builder.group({
            username: [username, Validators.required],
            password: ['', Validators.required],
            remember: [this.remember]
        });
    }

    onSubmit(form: Login): void {
        this.login = true;
        Swal.showLoading();
        if (this.signInForm.valid) {
            this.auth.login(form).subscribe(resp => {
                Swal.close();
                this.login = false;
                this.auth.saveToken(resp.token);
                if (form.remember) {
                    this.remember = form.remember;
                    localStorage.setItem(systemName + 'Remember', form.username);
                } else {
                    localStorage.removeItem(systemName + 'Remember');
                    this.remember = false;
                }
                this.router.navigateByUrl('/');
            }, err => {
                Swal.close();
                this.login = false;
                Swal.fire(
                    'Error',
                    'Usuario y/o contraseña incorrectos',
                    'error'
                );
                this.error = true;
            });
        }
    }

    getUserData(): JSON {
        return this.userData;
    }
}

