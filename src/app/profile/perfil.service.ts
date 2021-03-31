import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild, ElementRef } from "@angular/core";
import { Perfil } from "./perfil";
import { Observable } from "rxjs";
import { conf } from "../config/app.config";
import { Pais } from "../ideia/shared/pais";
import { Usuario } from "../auth/signin/shared/user";

@Injectable()
export class PerfilService {
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private http: HttpClient) {

  }

  updatePerfil(profile: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(conf.apiUrl + "perfil/" + profile.id, profile);

  }

  getPerfil(id): Observable<Perfil> {
    //Setando usuario_id
    return this.http.get<Perfil>(conf.apiUrl + "perfil/" + id)
      .map(res => res);
  }

  getPais() {
    return this.http.get<Pais[]>(conf.apiUrl + "pais").map(res => res);

  }

  getPerfilView(id){
    return this.http.get<Usuario>(conf.apiUrl + "usuarios/" + id)
      .map(res => res);
  }

  countPosts(usuario_id): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "perfil/count/posts/" + usuario_id)
      .map(res => res);
  }

  countLikes(usuario_id): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "perfil/count/likes/" + usuario_id)
      .map(res => res);
  }

  countEquipes(usuario_id): Observable<number> { 
    return this.http.get<number>(conf.apiUrl + "perfil/count/equipes/" + usuario_id)
      .map(res => res);
  }



}


