import { Usuario } from "./user";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { conf } from "../../../config/app.config";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  
  public loggedIn = new BehaviorSubject<boolean>(false); 

  getUsers(): Observable<Usuario[]> {
    //Setando usuario_id
    return this.http.get<Usuario[]>(conf.apiUrl + "usuarios")
      .map(res => res);
  }

  getUsersDistinct(id): Observable<Usuario[]> {
    //Setando usuario_id
    return this.http.get<Usuario[]>(conf.apiUrl + "usuarios/distinct/"+id)
      .map(res => res);
  }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  
  getUsLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(conf.apiUrl + "usuarios/us")
      .map(res => res);
  }
  newUsuario(user: Usuario) {
    return this.http.post(conf.apiUrl + "usuarios", JSON.stringify(user), { observe: "response", responseType: "text" });
  }

  authUsuario(user: Usuario) {
    return this.http.post(conf.apiUrl + "login", JSON.stringify(user), { observe: "response", responseType: "text" });

  }
}