import { Component, OnInit } from '@angular/core';
import { IdeiaService } from '../ideia/shared/ideia.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { IdeiaDTO } from './ideia_dto';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  dataSource: MatTableDataSource<IdeiaDTO>;
  displayedColumns = ['index','titulo', 'data_ini', 'data_fim','quant'];

  constructor(private service: IdeiaService) { 
   
  }

  ngOnInit() {
    this.service.getLikeRanking()
      .subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
      }, err => {
        console.log(err);
      });
  }
}
