import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup = undefined;
  submitted = false;
  error: string;
  role: string = '';
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private ticketService: TicketsService) { }

  get login() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.role = this.cookieService.get('role');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  eyePassword = () => this.hidePassword = !this.hidePassword;

  submit = async () => {
    this.error = undefined;
    this.submitted = true;
    if (this.loginForm && this.loginForm.invalid) {
      return;
    }
    try {
      const res = await this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      res && (
        this.commonService.newEvent(res.name),
        this.ticketService.containerTickets = res.ticketSold,
        this.authService.storeAuthData(res),
        this.router.navigate(['homepage'])
      )
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
    }
  }

  back = () => this.router.navigate(['choose-role']);

}
