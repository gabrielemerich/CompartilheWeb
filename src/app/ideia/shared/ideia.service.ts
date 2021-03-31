import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ideia } from "./ideia";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Comentario } from "../../dashboard/detail/comment/comentario";
import { conf } from "../../config/app.config";
import { Like } from "./like";
import { Pais } from "./pais";
import { Categoria } from "./categoria";
import { IdeiaDTO } from "src/app/ranking/ideia_dto";





@Injectable()
export class IdeiaService {

  static emitirFiltro = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  newIdeia(ideia: Ideia): Observable<Ideia> {
    return this.http.post<Ideia>(conf.apiUrl + "posts", JSON.stringify(ideia));
  }

  search(searchText: string){
    IdeiaService.emitirFiltro.emit(searchText);
  }

  updateIdeia(ideia: Ideia): Observable<Ideia> {
    return this.http.put<Ideia>(conf.apiUrl + "posts/" + ideia.id, ideia);
  }

  deleteIdeia(id){
    return this.http.delete(conf.apiUrl+"posts/"+id, { observe: "response", responseType: "text" });
  }

  getIdeias(): Observable<Ideia[]> {
    //Setando usuario_id
    return this.http.get<Ideia[]>(conf.apiUrl + "posts")
      .map(res => res);
  }

  getIdeiaDetail(id) {
    return this.http.get<Ideia>(conf.apiUrl + "posts" + "/" + id)
      .map(res => res);
  }

  newComment(ideia: Comentario) {

    return this.http.post(conf.apiUrl + "comments", JSON.stringify(ideia), { observe: "response", responseType: "text" });
  }

  getComments(id) {

    return this.http.get<Comentario[]>(conf.apiUrl + "comments/post/" + id).map(res => res);

  }

  getCategorias() {

    return this.http.get<Categoria[]>(conf.apiUrl + "posts/categoria").map(res => res);

  }

  getLikeRanking(): Observable<IdeiaDTO[]> {
    return this.http.get<IdeiaDTO[]>(conf.apiUrl+"posts/rank");
  }

  newLike(like: Like) {
    return this.http.post(conf.apiUrl + "likes", JSON.stringify(like), { observe: "response", responseType: "text" });

  }

  countLikesPosts(post_id): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "likes/count/post/" + post_id)
      .map(res => res);
  }

  deleteLike(post_id, user_id) {
    return this.http.delete(conf.apiUrl + "likes/" + post_id + "/" + user_id, { observe: "response", responseType: "text" });
  }

  getLikes(post_id) {
    return this.http.get<Like[]>(conf.apiUrl + "like/post/" + post_id).map(res => res);

  }

  getPais(){
    return this.http.get<Pais[]>(conf.apiUrl + "pais").map(res => res);

  }

  countPosts(): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "posts/count")
      .map(res => res);
  }

  countLikes(): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "posts/count/likes")
      .map(res => res);
  }

  countUsers(): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "posts/count/users")
      .map(res => res);
  }

  countComments(): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "posts/count/comments")
      .map(res => res);
  }
}