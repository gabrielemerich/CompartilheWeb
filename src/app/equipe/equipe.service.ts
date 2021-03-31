import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Equipe } from "./equipe";
import { conf } from "../config/app.config";
import { Observable } from "rxjs";


@Injectable()
export class EquipeService {

  constructor(private http: HttpClient) { }

  newEquipe(Equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(conf.apiUrl + "equipe", JSON.stringify(Equipe));
  }

  updateEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(conf.apiUrl + "equipe/" + equipe.id, equipe);
  }

  deleteEquipe(id){
    return this.http.delete(conf.apiUrl+"equipe/"+id, { observe: "response", responseType: "text" });
  }

  getEquipe(user_id): Observable<Equipe[]> {
    //Setando usuario_id
    return this.http.get<Equipe[]>(conf.apiUrl + "equipe/user/"+user_id)
      .map(res => res);
  }

  getEquipeId(id) {
    return this.http.get<Equipe>(conf.apiUrl + "equipe" + "/" + id)
      .map(res => res);
  }

  
}