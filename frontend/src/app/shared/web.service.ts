import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ObservableInput, } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  handleError: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:4500";
  }
  httOptions: any = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    }),
    observe: 'response'
  }
  httOptionstext: any = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  };

  get(uri: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.ROOT_URL}/${uri}`, this.httOptions);
  }

  alogin(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  aReg(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  Cpaper(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  slogin(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  Sprofile(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  sregister(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  addQ(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  addmarks(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  addresponse(uri: string, payload: Object): Observable<any> {
    return this.http.post<{ data: any }>(`${this.ROOT_URL}/${uri}`, payload, this.httOptions);
  }
  patch(uri: string): Observable<any> {
    return this.http.put<{ data: any }>(`${this.ROOT_URL}/${uri}`, this.httOptions)
  }
  delete(uri: string): Observable<any> {
    return this.http.delete<{ data: any }>(`${this.ROOT_URL}/${uri}`, this.httOptions)
  }
}
