import { Component, Renderer2, Input } from '@angular/core';
import { Ideia } from '../ideia/shared/ideia';
import { IdeiaService } from '../ideia/shared/ideia.service';
import { Like } from '../ideia/shared/like';
import { Usuario } from '../auth/signin/shared/user';
import { StorageService } from '../config/storage.service';
import { SharedComponent } from './dialogs/shared.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Feed } from '../feed/feed';
import { FeedService } from '../feed/feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  searchText : string;
  avatar: string;
  feed = new Feed();

  public count_posts : number;
  public count_likes: number;
  public count_users: number;
  public count_comments: number;

  public us_logado_id: string;
  public posts: Ideia[] = [];
  public likes = new Like();
  private shared = new Feed();
  constructor(
    private service: IdeiaService,
     private renderer: Renderer2,
     private storage: StorageService,
     private dialog: MatDialog,
     private feedService: FeedService,
     private alert: MatSnackBar
     ) { 
       this.us_logado_id = this.storage.getIdUsuarioLogado();
     }

  ngOnInit() {
    this.load();
    this.loadValues();
    IdeiaService.emitirFiltro.subscribe(data=>this.searchText = data);
    
  }
  mudouValor(event){
    console.log(event)
  }

  loadValues(){
    this.service.countPosts().subscribe(data=>{
      this.count_posts = data;
    });

    this.service.countLikes().subscribe(data=>{
      this.count_likes = data;
    });

    this.service.countComments().subscribe(data=>{
      this.count_comments = data;
    });

    this.service.countUsers().subscribe(data=>{
      this.count_users = data;
    });
  }

  openDialogQuadro(post_id): void {
    let id = post_id;
    const dialogRef = this.dialog.open(SharedComponent, {
      width: '350px',
      data: this.feed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        let ideia = new Ideia();
        let us = new Usuario();
        us.id = parseInt(this.storage.getIdUsuarioLogado());
        ideia.id = id;
        this.feed = result;
        this.feed.post_feed = ideia;
        this.feed.user_feed = us;
        if(this.feed.descricao.trim() == ""){
          this.alert.open('Diga algo sobre este projeto!', '', {
            duration: 2000
          });
          return;
        }
        this.feedService.newShared(this.feed).subscribe(
          data=>{ 
            this.alert.open('Você compartilhou um projeto!', '', {
              duration: 2000
            });
          },
          err =>{ console.log(err) }
        )
      }
    });
    
  }

  toggleClass(event: any, elementClass: string, post_id: number) {
    this.us_logado_id = this.storage.getIdUsuarioLogado();
    const hasClass = event.target.classList.contains(elementClass);
    if(hasClass) {
      this.renderer.removeClass(event.target, elementClass);
      this.delLike(post_id, this.us_logado_id);
    } else {
      this.renderer.addClass(event.target, elementClass);
      this.like(post_id, this.us_logado_id);
    }
  }
  
  ngOnDestroy(){
    //this.load();
  }

  like(post_id, us_id){
    let post = new Ideia();
    let user = new Usuario();
    //Setando usuario_id
    console.log(this.us_logado_id);
    user.id = parseInt(this.us_logado_id);
    post.Id = post_id;
    this.likes.post_like = post;
    this.likes.usuario_like = user;
    this.service.newLike(this.likes).subscribe(
      data => console.log('ok'),
      error => console.log(error)

    );
  }

  delLike(post_id, user_id){
    this.service.deleteLike(post_id, user_id).subscribe(
      data => console.log('ok'),
      error => console.log(error)

    );
  }
    load(){
      this.us_logado_id = this.storage.getIdUsuarioLogado();
      this.service.getIdeias().
      subscribe(data => {
        
        this.posts = data
        console.log(this.posts)
      });
  }
}
