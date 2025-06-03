import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.scss']
})
export class TableDisplayComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  nonEmptyColumns: string[] = [];
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  selectedUserIndex: number = 0;

  
  constructor(public dataService: DataService,private router: Router,) {}

  ngOnInit() {
    this.dataService.users$.subscribe(users => {
      this.users = users;
      if (this.users.length === 0) {
        this.router.navigate(['/upload']);
      } else {
        this.filterNonEmptyColumns();
      }
    });
  }

  /**
   * Identifie les colonnes qui contiennent au moins une valeur non vide
   */
  private getNonEmptyColumns(): string[] {
    if (this.users.length === 0) return [];

    const allColumns = Object.keys(this.users[0]);
    
    return allColumns.filter(column => {
      return this.users.some(user => {
        const value = user[column];
        return value !== null && 
               value !== undefined && 
               value !== '' && 
               (typeof value === 'string' ? value.trim() !== '' : true);
      });
    });
  }

  /**
   * Filtre les données pour ne garder que les colonnes non vides
   */
  private filterNonEmptyColumns(): void {
    this.nonEmptyColumns = this.getNonEmptyColumns();
    
    this.filteredUsers = this.users.map(user => {
      const filteredUser: any = {};
      this.nonEmptyColumns.forEach(column => {
        filteredUser[column] = user[column];
      });
      return filteredUser;
    });
  }

  /**
   * Retourne les données filtrées (utilisez cette méthode dans le template)
   */
  getFilteredData(): any[] {
    return this.filteredUsers;
  }

  /**
   * Retourne les noms des colonnes non vides (pour les en-têtes du tableau)
   */
  getColumnNames(): string[] {
    return this.nonEmptyColumns;
  }

  /**
   * Méthode pour obtenir le nom d'affichage de la colonne
   */
  getDisplayName(columnName: string): string {
    const displayNames: { [key: string]: string } = {
      'Nom': 'Nom',
      'Prenom': 'Prénom',
      'Name': 'Nom',
      'FirstName': 'Prénom',
      'Email': 'Email',
      'Phone': 'Téléphone',
      'Address': 'Adresse'
    };
    return displayNames[columnName] || columnName;
  }

  goBackToUpload() {
    this.router.navigate(['/upload']);
  }
  

  selectAndSubmitUser(userIndex: number) {
    this.selectedUserIndex = userIndex;
    this.SubmitData();
  }

  SubmitData() {
    const selectedUser = this.users[this.selectedUserIndex];
    
    if (selectedUser) {
      this.dataService.postUser(selectedUser).subscribe(response => {
        console.log('Posted user:', selectedUser);
        console.log('Response:', response);
      });
    }
  }

  

}