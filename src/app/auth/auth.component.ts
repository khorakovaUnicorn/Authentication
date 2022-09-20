import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  // musime rozdelit mode na login a sign up
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  // pridani authservice
  constructor(private authService: AuthService, private router: Router) {}
  // pouzijeme router, ktery nas pokud projde authentikace presmeruje na recepty

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    //  toto neni login mode,
  }

  onSubmit(form: NgForm) {
    // pridani authservice
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      //  presmerovani na recepty
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
