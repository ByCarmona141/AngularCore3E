import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, ValidatorFn } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { API_URL, systemName } from '../../environments/environment';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private http: HttpClient) {
  }

  remote(table: string, field: string, value?: any): ValidatorFn {
    return (control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> => {
      return new Promise((resolve, reject) => {
        if (control.value != null) {
          const controlValue = control.value.toString();
          const headers = new HttpHeaders({
            Authorization: localStorage.getItem(systemName + 'Token')
          });
          this.http.get(`${API_URL}api/validators/remote/${table}/${field}/${controlValue}`, { headers })
            .subscribe(resp => {
              if (value) {
                if (value.toString() === controlValue) {
                  resolve(null);
                }
              }

              // @ts-ignore
              if (resp.toUpperCase() === controlValue.toUpperCase()) {
                resolve({ existe: true });
              } else {
                resolve(null);
              }
            });
        } else {
          resolve(null);
        }
      });
    };
  }

  password(id: number, value?: string): ValidatorFn {
    return (control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> => {
      return new Promise((resolve, reject) => {
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem(systemName + 'Token')
        });
        this.http.get(`${API_URL}api/validators/password/${id}/${control.value}`, { headers })
          .subscribe(resp => {
            // @ts-ignore
            if (resp.status === 'success') {
              // @ts-ignore
              if (resp !== '') {
                resolve({ existe: true });
              } else {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          });
      });
    };
  }


}
