import {Component} from '@angular/core';
import {MatFormField, MatLabel, MatInput, MatError} from '@angular/material/input';
import {MatCard, MatCardContent} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user-service';


@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatCard,
    MatButton,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService){
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
    const body = this.loginForm.value;

    this.userService.login(body).subscribe({
      next: (res) => console.log('ok', res),
      error: (err) => console.error('Error', err),
    });
  }

}
