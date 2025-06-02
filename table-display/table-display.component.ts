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
      // Si pas de données, rediriger vers upload
      if (this.users.length === 0) {
        this.router.navigate(['/upload']);
      }
    });
  }

  goBackToUpload() {
    this.router.navigate(['/upload']);
  }

  downloadExcel() {
    if (this.users.length > 0) {
      import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.users);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'exported_data');
      });
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName + '.xlsx';
    link.click();
  }
}