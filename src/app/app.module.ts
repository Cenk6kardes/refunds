import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { ChartModule } from 'angular-highcharts';
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import {  MatTableModule } from "@angular/material/table";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { RefundDataTableComponent } from './refund-data-table/refund-data-table.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PaymentDialogComponent } from './dialog/payment-dialog/payment-dialog.component';
import { AddRefundCodeDialogComponent } from './dialog/add-refund-code-dialog/add-refund-code-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    RefundDataTableComponent,
    LoginComponent,
    NotFoundPageComponent,
    PaymentDialogComponent,
    AddRefundCodeDialogComponent,

  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    ChartModule,
    MatDialogModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 2500
  }),
  ],
  providers: [  {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
