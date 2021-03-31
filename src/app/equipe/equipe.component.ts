import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EquipeService } from './equipe.service';
import { Equipe } from './equipe';
import { UserService } from '../auth/signin/shared/user.service';
import { Usuario } from '../auth/signin/shared/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteComponent } from '../core/dialogs/delete.component';
import { StorageService } from '../config/storage.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
  title_button: string = "Criar Equipe";
  equipes: any[] = [];
  equipe = new Equipe();
  users_forms = new FormControl();
  equipeForm: FormGroup;
  users: Usuario[];
  selected = [];
  equipe_id : number;
  public id_us: string;
  constructor(
      private service: EquipeService, 
      private fb: FormBuilder, 
      private user_service: UserService,
      private dialog: MatDialog,
      private router: Router,
      private storage: StorageService,
      private alert : MatSnackBar
    ) {
    this.equipeForm = this.fb.group({
      nome: ['', Validators.compose([this.noWhitespaceValidator])],
      descricao: ['', Validators.compose([this.noWhitespaceValidator])],
    });

    this.id_us  = this.storage.getIdUsuarioLogado();
  

  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
  //Edit

  editarEquipe(id) {
    this.title_button = "Editar Equipe";
    let ar = new Array();
    this.service.getEquipeId(id)
      .subscribe(
        equipe_id => {
         
          this.equipe_id = equipe_id.id;
          this.equipe = equipe_id,
            this.equipe.usuarios.forEach(function (value) {
              ar.push(value.id);
            });
          this.selected = ar;
          this.equipeForm.patchValue({
            nome: String(this.equipe.nome),
            descricao: String(this.equipe.descricao)
          })
        },
        response => {
          this.load();
          if (response.status == 404) {
            console.log('nao encontrado')
          }
          
        });
  }

  ngOnInit() {
    this.load();
  }

  deleteEquipe(id): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.service.deleteEquipe(id).subscribe(
            data=> {
              this.load();
            },
            
            error=>console.log("error")
          );
   
    });
  }

  newEquipe() {
    this.equipe = this.equipeForm.value;
    this.equipe.usuarios = new Array(this.selected.length);
    if(this.selected.length > 0){
      for (var i = 0; i < this.selected.length; i++) {
        this.equipe.usuarios[i] = { id: this.selected[i] };
      }
  }
    this.equipe.usuarios.push({id:this.id_us})
    if(this.equipe_id){
      this.equipe.id = this.equipe_id;
      console.log("equipid"+this.equipe_id)
      this.service.updateEquipe(this.equipe).subscribe(
        data => {
          this.alert.open('Informações de Equipe Atualizadas!', '', {
            duration: 2000
          });
          this.load();
          this.limpaForm();
          this.title_button = "Criar Equipe";
        },
        error => console.log(error)
      )
    }
    else{
      this.service.newEquipe(this.equipe).subscribe(
        data => {
          this.equipes.push(this.equipe);
          this.alert.open('Equipe Criada com Sucesso!', '', {
            duration: 2000
          });
          this.load();
          this.limpaForm();
           
        },
        error => console.log(error)

      );
    }
    console.log(this.equipe)


  }

limpaForm(){
  this.equipeForm.patchValue({
    nome: null,
    descricao: null
  })
  this.equipe_id = null;
  this.selected = [];
  this.title_button = "Criar Equipe";

}

  load() {
    
    this.service.getEquipe(this.id_us).
      subscribe(data => {
        this.equipes = data
      });

    this.user_service.getUsersDistinct(this.id_us).subscribe(data => {
      this.users = data;
    })
  }
}
