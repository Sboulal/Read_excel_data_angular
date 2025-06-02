import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  public users$ = this.usersSubject.asObservable();

  setUsers(users: any[]) {
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.usersSubject.value;
  }
}