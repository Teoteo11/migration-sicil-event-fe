import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { EditTicketComponent } from './components/tickets/edit-ticket/edit-ticket.component';
import { ListTicketsComponent } from './components/tickets/list-tickets/list-tickets.component';
import { SellTicketComponent } from './components/tickets/sell-ticket/sell-ticket.component';
import { CommonGuard } from './guards/common.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { 
    path: 'choose-role', 
    component: ChooseRoleComponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: '', 
    redirectTo: '/choose-role',
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [CommonGuard] 
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [CommonGuard],
  },
  { 
    path: 'homepage/:id', 
    component: EditTicketComponent, 
    canActivate: [CommonGuard]
  },
  {
    path: 'sell-ticket',
    component: SellTicketComponent,
    canActivate: [CommonGuard]
  },
  {
    path: 'tickets',
    component: ListTicketsComponent,
    canActivate: [CommonGuard]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
