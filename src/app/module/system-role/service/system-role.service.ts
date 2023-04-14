import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, systemName } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class systemRoleService {

    constructor(private http: HttpClient) {
    }

    create(formData: {}): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.post(`${ API_URL }api/systemRole`, formData, { headers });
    }

    update(formData: {}, id: number): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.put(`${ API_URL }api/systemRole/${ id }`, formData, { headers });
    }

    delete(id: number): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.delete(`${ API_URL }api/systemRole/${ id }`, { headers });
    }

    data(id): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.get(`${ API_URL }api/systemRole/${ id }`, { headers });
    }

    combo(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.get(`${ API_URL }api/systemRole/combo`, { headers });
    }


    privilegesRole(id: number): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });
        return this.http.get(`${ API_URL }api/systemRole/${ id }/privileges`, { headers });
    }

    setSystemRolePrivileges(formValue, id: number): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
        });

        return this.http.post(`${ API_URL }api/systemRole/${ id }/privileges`, { formValue }, { headers });
    }
}
