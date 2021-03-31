/* tslint:disable:max-line-length */
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { QuadroComponent } from './dialogs/quadro.component';
import { CardComponent } from './dialogs/card.component';
import { ActivatedRoute } from '@angular/router';
import { TaskBoardService } from './taskboard.service';
import { Tasks } from '../tasks';
import { TaskBoard } from '../taskboard';
import { DeleteComponent } from '../../core/dialogs/delete.component';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})

export class TaskboardComponent implements OnInit {
  taskboard: TaskBoard[];
  equipe_id: number;
  title: string;
  title_card: string;
  tboard = new TaskBoard();
  tasks = new Tasks();
  card_descricao: string;
  subs = new Subscription();
  public constructor(
    private dragulaService: DragulaService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: TaskBoardService

  ) {
    this.dragulaService.dropModel.subscribe((value: any[]) => {
      for (var i = 0; i < this.taskboard.length; i++) {
        console.log(this.taskboard[i]);
        this.service.updateTask(this.taskboard[i]).subscribe(
          data => {
            console.log("ok")
          },

          error => console.log("error")
        );
      }
    });


  }

  openDialogQuadro(): void {
    const dialogRef = this.dialog.open(QuadroComponent, {
      width: '250px',
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
      this.title = result;
      this.tboard.title = this.title;
      this.tboard.equipe_id = this.equipe_id;
      this.service.newTaskBoard(this.tboard).subscribe(
        data => this.getTaskBoardEquipe(this.equipe_id),
        error => console.log(error)

      );
      }
    });
    
  }

  deleteTaskBoard(id): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.service.deleteTask(id).subscribe(
            data=>{
              this.getTaskBoardEquipe(this.equipe_id);
            },
              error=>console.log("error")
          );
   
    });
  }

  openDialogCard(id): void {

    const dialogRef = this.dialog.open(CardComponent, {
      width: '250px',
      data: { title: this.title_card, description: this.card_descricao }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result)
      for (var i = 0; i < this.taskboard.length; i++) {
        if (this.taskboard[i].id == id) {

          this.taskboard[i].tasks.push({title: result.title, description:result.descricao});
          console.log(this.taskboard[i].tasks);
          this.service.updateTask(this.taskboard[i]).subscribe(
            data => {

              this.service.getTaskboardsEquipe(this.equipe_id)
            },

            error => console.log("error")
          );
        }
      }
    });
  }


  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      this.equipe_id = id;
      if (!id)
        return;
      this.getTaskBoardEquipe(id);
    });
  }

  private getTaskBoardEquipe(id: any) {
    this.service.getTaskboardsEquipe(id)
      .subscribe(taskboards => {
        this.taskboard = taskboards;
      }, response => {
        if (response.status == 404) {
          console.log('nao encontrado');
        }
      });
  }

  addCard(i, title_card, descricao) {
    this.taskboard[i].tasks.push({
      title: title_card,
      description: descricao
    });
  }

}
