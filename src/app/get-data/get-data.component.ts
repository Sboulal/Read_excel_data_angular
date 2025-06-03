import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


// Interface for User data structure
interface User {
  id?: number;
  nom: string;
  prenom: string;
  valide: string
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {
  users: User[] = [];
  selectedUserIndex: number = 0;
  
  // Replace with your actual API endpoint
  private apiUrl = 'https://eevent.ma/api/getbadges';

  constructor(private http: HttpClient,public dataService: DataService,) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(data => {
      this.users = data;
    });
  }

  refreshData(): void {
    this.fetchUsers();
  }
 
  selectAndSubmitUser(userIndex: number) {
    this.selectedUserIndex = userIndex;
    this.SubmitData();
  }

  SubmitData() {
    const selectedUser = this.users[this.selectedUserIndex];
    console.log('Selected User:', selectedUser);
    
    if (selectedUser) {
      this.dataService.postUser_data(selectedUser).subscribe(response => {
        console.log('Posted user:', selectedUser);
        console.log('Response:', response);
      });
    }
  }
}