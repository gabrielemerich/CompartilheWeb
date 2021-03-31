import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../signin/shared/user.service';
import { Usuario } from '../signin/shared/user';
import { MatSnackBar } from '@angular/material';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private usuario = new Usuario();
  public form: FormGroup;
  constructor(
      private fb: FormBuilder, 
      private router: Router, 
      private service: UserService,
      public alert: MatSnackBar
    ) {}

  ngOnInit() {
    this.form = this.fb.group( {
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      nome: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.minLength(6),Validators.maxLength(8)])],
      senha: [null]
    } );
  }

  onSubmit() {
    let pass = this.form.controls["password"].value;
    let confirm = this.form.controls["senha"].value;

    if(pass != confirm){
      this.alert.open('Senhas distintas, digite novamente...', '', {
        duration: 2000
      })
      return;
    } 
    this.usuario = this.form.value;
    
    this.service.newUsuario(this.usuario).subscribe(
      data =>  {
        this.alert.open('Cadastro Realizado Com Sucesso!!', '', {
        duration: 2000
      })
      this.router.navigate(['auth/signin']);


    },

      error => {
        if(error.status == 403){
          this.alert.open('Este e-mail já consta em nossos registros!', '', {
            duration: 2000
          });
        }
      }

    );
    
  }
}
