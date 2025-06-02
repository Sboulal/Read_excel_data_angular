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

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.users$.subscribe(users => {
      this.users = users;
      if (this.users.length === 0) {
        this.router.navigate(['/upload']);
      }
    });
  }

  goBackToUpload() {
    this.router.navigate(['/upload']);
  }

}