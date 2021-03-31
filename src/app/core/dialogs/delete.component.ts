import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  template: `<h2 mat-dialog-title><b>Excluir</b></h2>
  <mat-dialog-content>Deseja mesmo excluir?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancelar</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-raised-button [mat-dialog-close]="true" style="background: #b91206 !important; color: #fff !important">Excluir</button>
  </mat-dialog-actions>`

})
export class DeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
