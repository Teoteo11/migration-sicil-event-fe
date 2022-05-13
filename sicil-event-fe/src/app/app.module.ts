import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { CookieModule } from 'ngx-cookie';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './shared/button/button.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BtnTicketComponent } from './shared/btn-ticket/btn-ticket.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CounterTotalComponent } from './components/tickets/counter-total/counter-total.component';
import { SellTicketComponent } from './components/tickets/sell-ticket/sell-ticket.component';
import { FilterBarComponent } from './shared/filter-bar/filter-bar.component';
import { ListTicketsComponent } from './components/tickets/list-tickets/list-tickets.component';
import { TicketComponent } from './components/tickets/ticket/ticket.component';
import { EditTicketComponent } from './components/tickets/edit-ticket/edit-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChooseRoleComponent,
    ButtonComponent,
    LoaderComponent,
    HomepageComponent,
    NavbarComponent,
    BtnTicketComponent,
    CounterTotalComponent,
    SellTicketComponent,
    FilterBarComponent,
    ListTicketsComponent,
    TicketComponent,
    EditTicketComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it-IT'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
