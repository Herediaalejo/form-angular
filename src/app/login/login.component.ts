import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  NgModel,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; // Si necesitas íconos
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule, // Opcional
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: String = '';
  form!: FormGroup;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  obtenerDatos() {
    this.apiService.getData().subscribe((data) => {
      console.log('Data received:', data);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { user, pass } = this.form.value;
      this.apiService
        .login({ username: user, password: pass })
        .subscribe((data) => {
          if (data.statusCode === 200) {
            this.router.navigate(['/home']);
          } else {
            console.log(data);
          }
        });
    }
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
}
