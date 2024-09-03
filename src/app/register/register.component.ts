import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Asegúrate que esté en plural
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    });
  }

  openConfirmDialog(): void {
    if (!this.form.valid) {
      alert('Por favor, complete todos los campos');
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { onSubmit: this.onSubmit.bind(this) }, // Pasar la referencia de onSubmit
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Acción confirmada');
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { username, password, repeatPassword } = this.form.value;
      if (password !== repeatPassword)
        return alert('Las contraseñas no coinciden');

      this.apiService.register({ username, password }).subscribe((data) => {
        if (data.statusCode === 200) {
          this.router.navigate(['/login']);
        } else {
          alert(data.message);
        }
      });
    }
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }
}
