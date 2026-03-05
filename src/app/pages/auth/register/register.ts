import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {UserService} from '../../../core/services/user-service';
import {UserRegisterRequest} from '../../../core/models/UserRegisterRequest';
import {ThemeService} from '../../../core/services/theme-service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly lightTheme = 'light';
  readonly blackTheme = 'black';

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private themeService: ThemeService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(0)]],
      userType: ['NORMAL', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const body:UserRegisterRequest = this.registerForm.value;

    this.userService.register(body).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Error', err),
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
