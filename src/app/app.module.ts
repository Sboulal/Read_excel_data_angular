import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDisplayComponent } from './table-display/table-display.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { GetDataComponent } from './get-data/get-data.component';


@NgModule({
  declarations: [
    AppComponent,
    TableDisplayComponent,
    UploadComponent,
    GetDataComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
