import { Injectable } from '@angular/core';
import { API_URL, systemName } from '../../environments/environment';
import { Login } from '../module/login/interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public form: string;
    public action: string;
    public helper = new JwtHelperService();

    constructor(private httpClient: HttpClient) {
    }

    login(login: Login): Observable<any> {
        const data = {
            ...login
        };
        return this.httpClient.post(`${ API_URL }api/systemUser/login_check`, data);
    }

    logout(): void {
        localStorage.removeItem(systemName + 'Token');
    }

    isLogged(): boolean {
        if (localStorage.getItem(systemName + 'Token')) {

            const token = localStorage.getItem(systemName + 'Token');
            if (!this.helper.isTokenExpired(token)) {
                return true;
            }
        }
        this.logout();
        return false;
    }

    saveToken(resp: any): void {
        localStorage.setItem(systemName + 'Token', 'Bearer ' + resp);
    }

    getDataUsuario(): any {
        return this.helper.decodeToken(localStorage.getItem(systemName + 'Token'));
    }

    getMenu(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });

        const dataUser = this.getDataUsuario();

        return this.httpClient.get(`${ API_URL }api/systemMenu/menu/${ dataUser.idSystemRole }`, { headers });
    }

    refreshToken(): void {
        const token = localStorage.getItem(systemName + 'Token');
        const headers = new HttpHeaders({
            Authorization: token
        });
        const date = new Date();
        const now = date.getTime();
        const expTokenDate = this.helper.getTokenExpirationDate(token);
        const expToken = expTokenDate.getTime();

        const minutes = Math.floor((expToken - now) / 60000);

        if (minutes <= 10) {
            this.httpClient.post(`${ API_URL }api/systemUser/refresh_token`,
                {
                    token
                },
                { headers })
                .subscribe(resp => {
                    // @ts-ignore
                    this.saveToken(resp.token);
                });
        }
    }

    lockUser(username: string): Observable<any> {
        username = JSON.stringify({
            user: username
        });
        username = btoa(username);
        return this.httpClient.get(`${ API_URL }api/lockUser/${ username }`);
    }

    getRoutePrivilege(route: string, privilege: number): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.httpClient.get(`${ API_URL }api/getPrivileges/${ route }/${ privilege }`, { headers });
    }
}
