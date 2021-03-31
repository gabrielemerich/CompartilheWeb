import { Component, OnInit, OnDestroy } from '@angular/core';
//import { IdeiaService } from '../../cadastro-ideia/ideia.service';
//import { Ideia } from '../../cadastro-ideia/ideia';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ideia, Etapas } from '../../ideia/shared/ideia';
import { IdeiaService } from '../../ideia/shared/ideia.service';
import { Comentario } from './comment/comentario';
import { Usuario } from '../../auth/signin/shared/user';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from '../../core/dialogs/delete.component';
import { StorageService } from '../../config/storage.service';
import { BancoComponent } from '../dialogs/banco.component';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./post-detail.component.scss'],

})


export class DetailComponent implements OnInit {
 
  edit_delete: boolean;
  contribui: boolean;
  id: string;
  progress: number;
  countLikes : number;
  public post : Ideia;
  private inscricao : Subscription;
  public comment = new Comentario();
  public comments: Comentario[] = [];
  public usuario = new Usuario();
  public ideia = new Ideia();
  public id_detail: any;
  constructor(
    private service: IdeiaService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private storage: StorageService
  ) { 

    
  }

  ngOnInit() {
    
    
    
    this.inscricao = this.route.params.subscribe(
      (params: any) =>{
        
        let id = params['id'];
        this.id_detail = id;
        this.service.countLikesPosts(id).subscribe(
            data=>this.countLikes = data,
            error=> console.log(error)
          );
        
        this.getComments(id);
  
        this.service.getIdeiaDetail(id)
       
        .subscribe(
          post => {
            
            this.post = post;
            
            if(this.post.agencia == null || this.post.conta == null || this.post.banco == null ||
              this.post.meta_arrecadacao == null || this.post.total_arrecadacao == null ||
              this.post.titular == null || this.post.contato == null){
                this.contribui = false;
              }
              else{
                this.contribui = true;
              }
            //Edição e exclusão
            let id = this.storage.getIdUsuarioLogado();
            if(this.post.post_usuario.id == parseInt(id)){
                  this.edit_delete = true;
            }
            else{
              this.edit_delete = false;
            }
            //fim
            
            if(this.post.etapas == "DEV"){
                this.progress = 50;
            }
            else if(this.post.etapas == "INICIO")
            this.progress = 10;
            
            else if(this.post.etapas == "AFINAL")
            this.progress = 90

            else if(this.post.etapas == "FINAL")
            this.progress = 100
          },
          
          response => {
            if (response.status == 404) {
              //this.router.navigate(['NotFound']);
            }
          });

          
      }

 
    );

     
  }

  private getComments(id: any) {
    this.service.getComments(id).
      subscribe(data => {
        console.log(data);
        this.comments = data;
      });
  }

  salvarComment() {
   
    
        this.ideia.Id = this.id_detail;  
        this.comment.Data_hr = new Date().toLocaleDateString();
        this.usuario.id = parseInt(this.storage.getIdUsuarioLogado());
        this.comment.Usuario = this.usuario;
        this.comment.Post = this.ideia;
        this.service.newComment(this.comment).subscribe(
          data => {
            this.getComments(this.id_detail);
            this.comment.Body = "";
          },
          error => console.log(error)
    );
     
     
}

openDialog(): void {
  const dialogRef = this.dialog.open(DeleteComponent, {
    width: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.service.deleteIdeia(this.id_detail).subscribe(
          data=>{
            this.router.navigate([''])
          },
            error=>console.log("error")
        );
        }
  });
}

openDialogBanco(): void {
  const dialogRef = this.dialog.open(BancoComponent, {
    width: '950px',
    data: this.post
  });

  /*dialogRef.afterClosed().subscribe(result => {
    if(result)
      this.service.deleteIdeia(this.id_detail).subscribe(
          data=>{
            this.router.navigate([''])
          },
            error=>console.log("error")
        );
 
  });*/
}

  load(id){
    this.service.getComments(id).
    subscribe(data => {
      this.comments = data
      console.log(this.comments)
    });
  }

}
