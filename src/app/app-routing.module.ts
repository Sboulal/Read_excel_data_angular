import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { TableDisplayComponent } from './table-display/table-display.component';
import { GetDataComponent } from './get-data/get-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/get-data', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'table-display', component: TableDisplayComponent },
  {path: 'get-data', component: GetDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }