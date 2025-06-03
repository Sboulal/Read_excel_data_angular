import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUsers(users: any[]) {
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.usersSubject.value;
  }
  postUser(user: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', user);
  }

  postUser_data(user: any): Observable<any> {
    return this.http.post('https://eevent.ma/api/getbadges', user);
  }
  
}