import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { StorageService } from '../config/storage.service';
import { Perfil } from './perfil';
import { EditComponent } from './edit/edit.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Usuario } from '../auth/signin/shared/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  count_posts: number;
  count_equipes: number;
  isDataLoaded: boolean;
  count_likes: number;
  edit_flag: boolean;
  avatar: string;
  perfil_view  = new Perfil();
  private profile = new Perfil();
  private usuario = new Usuario();
  constructor(
    private service: PerfilService,
    private storage: StorageService,
    private dialog: MatDialog,
    private alert: MatSnackBar,
    private router: Router,
    private rt: ActivatedRoute
  ) { }


  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: this.profile

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profile = result;
        this.profile.id = parseInt(this.storage.getPerfil());
        this.profile.pais_id.id = result.pais_id.id;
        if (result.foto != null) {
          this.avatar = "data:image/png;base64," + result.foto;
        }

        if(this.profile.contato.trim() == "" || this.profile.profissao.trim() == "" ||
         this.profile.website.trim() == ""
        ){
          this.alert.open('Preencha os campos corretamente..', '', {
            duration: 2000
          });
          return;
        }
        
        this.service.updatePerfil(result).subscribe(
          data => {
            this.alert.open('Perfil Atualizado!', '', {
              duration: 2000
            });

          },
          error => {
            console.log(error)
          }
        )
      }
    });

  }

  ngOnInit() {
    let us_id = this.storage.getIdUsuarioLogado();
    let perfil_id = this.storage.getPerfil();

    var id = this.rt.params.subscribe(params => {
      var id = params['id'];
 
      if(id){
        us_id = id;
      }
      
    
    //counts
    this.service.countPosts(us_id).subscribe(data => {
      this.count_posts = data;
    },
      error => {
        console.log(error)
      });

    this.service.countLikes(us_id).subscribe(data => {
      this.count_likes = data;
    },
      error => {
        console.log(error)
      });

    this.service.countEquipes(us_id).subscribe(data => {
      this.count_equipes = data;
    },
      error => {
        console.log(error)
      });

   if(!id){
    //get perfil
    this.service.getPerfil(perfil_id)

      .subscribe(
        perfil => {
          this.edit_flag = true;
          this.profile = perfil;
          this.usuario.id = parseInt(this.storage.getIdUsuarioLogado());
          this.usuario.Nome = this.storage.getNome();

          this.isDataLoaded = true;
          if (perfil.foto != null) {
            this.avatar = "data:image/png;base64," + perfil.foto;
          }
          else this.avatar = null;
        },
        response => {
          if (response.status == 404) {
            console.log('nao encontrado')
          }
        });
      }
      else{
        if(id == this.storage.getIdUsuarioLogado()){
          this.router.navigate(['profile']);
        }
        this.service.getPerfilView(id).subscribe(
          usuario=>{
            
          this.edit_flag = false;
          this.usuario = usuario;
          if(this.usuario.profile.foto != null){
            this.avatar = "data:image/png;base64,"+ this.usuario.profile.foto;
          }
          else{
            this.avatar = null;
          }
          this.isDataLoaded = true;

        })
      }
    });
  }

}
