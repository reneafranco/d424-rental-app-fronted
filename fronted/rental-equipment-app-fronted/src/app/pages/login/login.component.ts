import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgFor,
    NgIf,
    RouterModule
  ],
  template: `
    <div class="container-fluid card login-container">
      <h3 class="text-center">Login</h3>
      <hr>
      <div class="alert alert-danger" role="alert" *ngIf="errorMsg.length">
        <p *ngFor="let msg of errorMsg">{{msg}}</p>
      </div>
      <div class="mb-3">
        <label for="login" class="form-label">Email address</label>
        <input [(ngModel)]="authRequest.email"  type="email" class="form-control" id="login" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input [(ngModel)]="authRequest.password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <div class="d-flex justify-content-between mb-3">
        <button (click)="login()" type="button" class="btn btn-primary d-flex align-items-center">
          <em class="fas fa-sign-in-alt me-2"></em> Sign in
        </button>
        <div>
          Don't have an account?&nbsp;
          <button (click)="register()" type="button" class="btn btn-link">
            Register
          </button>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; }
    .mb-3 { margin-bottom: 15px; }
  `]
})
export class LoginComponent {
  authRequest = { email: '', password: '' };
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['equipments']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
