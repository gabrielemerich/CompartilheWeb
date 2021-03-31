import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Tasks } from '../../tasks';

@Component({
    selector: 'app-card',
    template: `<h2 mat-dialog-title>Adicionar Cartão</h2>
    <mat-dialog-content>
    <mat-form-field>
      <input matInput [(ngModel)]="data.title" #titulo="ngModel" required placeholder="Título">
        <div *ngIf="titulo.invalid && (titulo.dirty || titulo.touched)" class="alert alert-danger">
            <div *ngIf="titulo.errors.required">
                <span style="font-size: 12px; color:#757575">Campo obrigatório.</span>
            </div>
        </div>
      </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.description" #description="ngModel" required placeholder="Descrição">
        <div *ngIf="description.invalid && (description.dirty || description.touched)" class="alert alert-danger">
            <div *ngIf="description.errors.required">
                <span style="font-size: 12px; color:#757575">Campo obrigatório.</span>
            </div>
        </div>
     </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="data" [disabled]="titulo.invalid || description.invalid">Criar</button>
    </mat-dialog-actions>`,
   
})
export class CardComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Tasks) { }

    ngOnInit(): void { }
}
