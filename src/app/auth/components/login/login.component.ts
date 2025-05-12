import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

  }

  onLogin() {
    if(this.loginForm.valid) {
      this.isLoading = true;

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.authenticate(email, password).subscribe({
        next: (value) => {
          console.log('Autenticado com sucesso', value);
          this.userService.saveToken(value.body?.access_token ?? '');
          this.router.navigate(['/'], { replaceUrl: true });
          this.loginForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open('Email ou senha inválidos.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          this.isLoading = false;
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
