import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

interface User {
  id?: number;
  prenom: string;
  nom: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  fullName: string = '';
  user: User = {
    nom: '',
    prenom: ''
  };

  // Inject your dataService instead of HttpClient
  constructor(private dataService:DataService,private http: HttpClient) {} // Replace 'any' with your actual DataService type

  onSubmit() {
    if (this.fullName.trim()) {
      // Store the entire full name in prenom
      this.user.prenom = this.fullName.trim();
      
      // Store a single space in nom
      this.user.nom = " ";
  
      // Use your dataService instead of direct HTTP call
      this.dataService.postUserinput(this.user).subscribe(response => {
        console.log('User added:', this.user);
        console.log('Response:', response);
        this.dataService.setUsers([...this.dataService.getUsers(), this.user]);
        this.fullName = '';
      });
    } else {
      alert('Veuillez entrer le nom et prénom');
    }
  }
 
}