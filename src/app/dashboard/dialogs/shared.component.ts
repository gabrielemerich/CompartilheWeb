import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Feed } from 'src/app/feed/feed';

@Component({
    selector: 'app-name',
    template: `<h2 mat-dialog-title>Compartilhando Publicação</h2>
    <mat-dialog-content>
    <mat-form-field style="width: 290px !important">
      <textarea matInput [(ngModel)]="data.descricao" #descricao="ngModel" required placeholder="Diga algo sobre isso:"></textarea>
        <div *ngIf="descricao.invalid && (descricao.dirty || descricao.touched)" class="alert alert-danger">
            <div *ngIf="descricao.errors.required">
                <span style="font-size: 12px; color:#757575">Campo obrigatório.</span>
            </div>
        </div>
     </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button style="color: #fff !important" [mat-dialog-close]="data" [disabled]="descricao.invalid">Compartilhar</button>
    </mat-dialog-actions>`
})
export class SharedComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Feed) { }

    ngOnInit(): void { }

}
