import { Component, OnInit, Inject } from '@angular/core';
import { Ideia } from 'src/app/ideia/shared/ideia';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-banco',
    styleUrls:['../dashboard.component.scss'],
    template: `<h2 mat-dialog-title>Contribuições Financeiras</h2>
   <span style="margin-top: -22px !important; position: absolute; font-size: 12px">Utilize os dados abaixo para contribuir ou entre em contato com o idealizador do projeto.</span>
    <mat-dialog-content>
    <table style="width: 100% !important; margin-top: 13px !important;" cellspacing="0">
                  <tr>
                    <td>
                      <mat-form-field >
                        <input matInput disabled type="number" [(ngModel)]="data.agencia" maxlength="4" placeholder="Agência">
                        <mat-icon matSuffix>money</mat-icon>
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field >
                        <input matInput disabled type="number" [(ngModel)]="data.conta" maxlength="6" placeholder="Número da Conta">
                        <mat-icon matSuffix>money</mat-icon>
                      </mat-form-field>
                    </td>
                    <td>
                        <mat-form-field >
                          <input matInput disabled [(ngModel)]="data.banco" placeholder="Banco">
                        <mat-icon matSuffix>domain</mat-icon>
                        </mat-form-field>
                      </td>
                      <td>
                        <mat-form-field >
                          <input matInput [(ngModel)]="data.titular" disabled placeholder="Titular">
                          <mat-icon matSuffix>person</mat-icon>
                        </mat-form-field>
                      </td>
                  </tr>
              
                </table>
                <table class="example-full-width" style="width: 100% !important" cellspacing="0">
                    <tr>   
                         
                    <td>
                      <mat-form-field class="example-full-width">
                        <input [(ngModel)]="data.contato" matInput disabled placeholder="E-mail">
                        <mat-icon matSuffix>email</mat-icon>
                      </mat-form-field>
                    </td>
                    <td>
                  <mat-form-field class="example-full-width">
                      <input matInput currencyMask [(ngModel)]="data.meta_arrecadacao" disabled placeholder="Meta de Arrecadação" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',',  allowNegative: false }" >
                      <mat-icon matSuffix>attach_money</mat-icon>
                    </mat-form-field>
                    </td>

                    <td>
                      <mat-form-field class="example-full-width">
                          <input matInput currencyMask [(ngModel)]="data.total_arrecadacao" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',',  allowNegative: false }" disabled placeholder="Total Arrecadado" >
                          <mat-icon matSuffix>mood</mat-icon>
                        </mat-form-field>
                        </td>
                  </tr>
                  </table>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="primary" mat-dialog-close>Fechar</button>
      <!--<button mat-button [mat-dialog-close]="data" >Compartilhar</button>-->
    </mat-dialog-actions>`
})
export class BancoComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Ideia) { }

    ngOnInit(): void {
    
     }
}
