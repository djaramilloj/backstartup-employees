import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { LoginForm, SuccessLoginResponse } from '../../../models/types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  private emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  private pwdPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})[a-zA-Z0-9]{8,}$/;  // al menos una letra mayúscula, números y letras y no caracteres especiales
  public loginError: boolean = false;
  public loginErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
        email: ['', [Validators.minLength(5), Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.minLength(8), Validators.required, Validators.pattern(this.pwdPattern)]]
    }); 
  }

  async onLogin() {
    const data: LoginForm = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    const rta: SuccessLoginResponse = await this.authService.logIn(data);
    if (rta.error && rta.message !== "User logged in successfully") {
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
        this.loginErrorMessage = rta.message;
      }, 3000);
    } else {
      this.storageService.setUserData(rta.data);
      this.router.navigate(['/main/home']);
    }
  }

}
