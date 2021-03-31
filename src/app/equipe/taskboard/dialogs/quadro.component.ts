import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TaskBoard } from '../../taskboard';

@Component({
    selector: 'app-name',
    template:`<h2 mat-dialog-title>Novo Quadro</h2>
    <mat-dialog-content>
    <mat-form-field>
      <input matInput [(ngModel)]="data.title" #titulo="ngModel" required placeholder="Título">
      <div *ngIf="titulo.invalid && (titulo.dirty || titulo.touched)" class="alert alert-danger">
            <div *ngIf="titulo.errors.required">
                <span style="font-size: 12px; color:#757575">Campo obrigatório.</span>
            </div>
        </div>
    </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" mat-dialog-close>Cancelar</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-button [mat-dialog-close]="data.title" [disabled]="titulo.invalid">Criar</button>
    </mat-dialog-actions>`,
})
export class QuadroComponent implements OnInit {
 
    constructor(public dialogRef: MatDialogRef<QuadroComponent>,@Inject(MAT_DIALOG_DATA) public data: TaskBoard) { }
    onNoClick(): void {
      this.dialogRef.close();
      console.log('teste')
    }
    ngOnInit(): void {
        
     }
}
