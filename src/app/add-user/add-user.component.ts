import { Component } from '@angular/core';

interface User {
  id: number;
  prenom: string;
  nom: string;
  dateAjout: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  formData = {
    prenom: '',
    nom: ''
  };

  users: User[] = [];
  showSuccess = false;
  errors: { [key: string]: string } = {};

  clearError(field: string): void {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  getInputClass(field: string): string {
    const baseClass = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
    const errorClass = this.errors[field] ? 'border-red-500' : 'border-gray-300';
    return `${baseClass} ${errorClass}`;
  }

  validateForm(): boolean {
    this.errors = {};
    
    if (!this.formData.prenom.trim()) {
      this.errors['prenom'] = 'Le prénom est requis';
    }
    
    if (!this.formData.nom.trim()) {
      this.errors['nom'] = 'Le nom est requis';
    }
    
    return Object.keys(this.errors).length === 0;
  }

  handleSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    // Add user to list
    const newUser: User = {
      id: Date.now(),
      prenom: this.formData.prenom.trim(),
      nom: this.formData.nom.trim(),
      dateAjout: new Date().toLocaleDateString('fr-FR')
    };

    this.users.push(newUser);
    
    // Reset form
    this.formData = { prenom: '', nom: '' };
    
    // Show success message
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }

  handleDeleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
