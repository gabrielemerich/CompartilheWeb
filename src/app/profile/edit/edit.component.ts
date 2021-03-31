import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Perfil } from '../perfil';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  paises = [];
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Perfil,
    public alert: MatSnackBar,
    private fb: FormBuilder,
    private service: PerfilService

  ) {
    this.createForm();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.service.getPais()
      .subscribe(
        pais => {
          this.paises = pais
        },
        response => {
          if (response.status == 404) {
            console.log('Not Found')
          }
        });

    this.form.patchValue({ pais_id: { id: this.data.pais_id.id } })


  }

  setImg() {
    var fm = this.form.value;
    if (fm.image == null) {
      console.log(fm.pais_id.id)
      this.data.pais_id.id = fm.pais_id.id;
      this.data.pais_id.nome = fm.pais_id.nome;
    }
    else {
      this.data.pais_id.id = fm.pais_id.id;
      this.data.foto = fm.image.value;
      this.data.pais_id.nome = fm.pais_id.nome;

    }
  }

  createForm() {
    this.form = this.fb.group({
      image: [null, Validators.compose([Validators.required])],
      profissao: [null, Validators.compose([Validators.required])],
      telefone: [null],
      pais_id: this.fb.group({
        id: [null, Validators.compose([Validators.required])]
      }),
      sobre: [null],
      contato: [null,Validators.compose ([CustomValidators.email])],
      website: [null]
    });

  }
  onFileChange(event) {
    let reader = new FileReader();
    var ext = ["image/png", "image/jpeg"];
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];


      if (file.type != ext[0] && file.type != ext[1]) {
        this.alert.open('Formatos permitidos (.jpg .png)', '', {
          duration: 2000
        });
        this.fileInput.nativeElement.value = "";

      }
      else if (file.size > 1048576) {
        this.alert.open('Tamanho máximo permitido para imagens é de 1MB', '', {
          duration: 2000
        });
        this.fileInput.nativeElement.value = "";
      }

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,

          value: reader.result.split(',')[1]

        })
      };
    }
  }
}
