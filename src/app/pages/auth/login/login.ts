import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink, Router} from '@angular/router';
import {UserService} from '../../../core/services/user-service';
import {AuthService} from '../../../core/services/auth-service';
import {UserLoginRequest} from '../../../core/models/UserLoginRequest';
import {ThemeService} from '../../../core/services/theme-service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly lightTheme = 'light';
  readonly blackTheme = 'black';
  loginError = false;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private themeService: ThemeService){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }
  onSubmit():void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const body:UserLoginRequest = this.loginForm.value;

    this.userService.login(body).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loginError = true;
      }
    });
  }

  //service to change theme
  onToggleTheme(): void{
    this.themeService.toggle(this.lightTheme, this.blackTheme);
  }
  isAltTheme(): boolean{
    return this.themeService.getTheme() === this.blackTheme;
  }

}
