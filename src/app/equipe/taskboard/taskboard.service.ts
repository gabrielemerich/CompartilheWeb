import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { conf } from "../../config/app.config";
import { HttpClient } from "@angular/common/http";
import { TaskBoard } from "../taskboard";


@Injectable()
export class TaskBoardService{

    constructor(private http: HttpClient){}

      getTaskboardsEquipe(id): Observable<TaskBoard[]> {
        //Setando usuario_id
        return this.http.get<TaskBoard[]>(conf.apiUrl + "taskboard/equipe/"+id)
          .map(res => res);
      }

      newTaskBoard(taskboard: TaskBoard): Observable<TaskBoard> {
        return this.http.post<TaskBoard>(conf.apiUrl + "taskboard", JSON.stringify(taskboard));
      }

      updateTask(task: TaskBoard): Observable<TaskBoard> {
        return this.http.put<TaskBoard>(conf.apiUrl + "taskboard/" + task.id, task);
      }

      deleteTask(id) {
        return this.http.delete(conf.apiUrl + "taskboard/"+id, { observe: "response", responseType: "text" });
      }
}