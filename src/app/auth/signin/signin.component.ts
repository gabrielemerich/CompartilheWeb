import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from './shared/user.service';
import { Usuario } from './shared/user';
import { StorageKeys } from '../../config/localuser.usuario';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  us_logado = [];
  private user = new Usuario();
  constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private service: UserService,
        private alert: MatSnackBar
    ) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required, CustomValidators.email ] )] , senha: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    this.user = this.form.value;
    this.service.authUsuario(this.user).subscribe(
      data=>{
          this.successLogin(data.headers.get('Authorization'));
          this.service.loggedIn.next(true);
          this.router.navigate (['']);
    },

    error=>{
      this.service.loggedIn.next(false);
      this.alert.open('E-mail ou senha inválidos...', '', {
        duration: 2000
      })
    });
  }

  successLogin(token: string){
    let tok = token.substring(7);
    localStorage.setItem(StorageKeys.token, tok);

    this.service.getUsLogado().subscribe(data=>{
      this.user = data;
      console.log(this.user)
      localStorage.setItem(StorageKeys.id, String(this.user.id));
      localStorage.setItem(StorageKeys.nome, String(this.user.nome))
      localStorage.setItem(StorageKeys.perfil, String(this.user.profile_id))
    
    },error=>{console.log(error)})
    
  }

}
