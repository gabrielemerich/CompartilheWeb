import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Ideia } from './shared/ideia';
import { Usuario } from '../auth/signin/shared/user';
import { IdeiaService } from './shared/ideia.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-ideia',
  templateUrl: './ideia.component.html',
  styleUrls: ['./ideia.component.scss']
})
export class IdeiaComponent implements OnInit {

  public ideia = new Ideia();
  public post_usuario = new Usuario();
  //selected = '2';

  @ViewChild('fileInput') fileInput: ElementRef;
  categorias = [];
  paises = [];
  isLinear = false;
  step1: FormGroup;
  step2: FormGroup;

  constructor(
    private service: IdeiaService,
    private fb: FormBuilder,
    public alert: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.post_usuario.id = 1;
    this.createForm();

  }



  createForm() {
    this.step2 = this.fb.group({
      image: [null, Validators.compose([Validators.required])],
      facebook: null,
      twitter: null,
      instagram: null,
    });

  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
        this.step2.get('image').setValue({
          filename: file.name,
          filetype: file.type,

          value: reader.result.split(',')[1]

        })
      };
    }
  }

  salvar() {
    let id = this.ideia.id;
    let img = this.ideia.img;

    this.ideia = this.step1.value;
    this.ideia.id = id;
    const fm = this.step2.value;
    if (fm.image == null) {
      this.alert.open('Escolha uma imagem...', '', {
        duration: 2000
      });
      return
    }
    this.ideia.img = (fm.image == null) ? img : fm.image.value;
    this.ideia.facebook = this.step2.controls.facebook.value;
    this.ideia.twitter = this.step2.controls.twitter.value;
    this.ideia.instagram = this.step2.controls.instagram.value;
    if (!id)

      this.service.newIdeia(this.ideia).subscribe(
        data => this.alert.open('Ideia Divulgada com Sucesso!!', '', {
          duration: 2000
        }),
        error => console.log(error)

      );

    else {
      if (this.ideia.img == null) {
        this.ideia.img = this.step2.controls.image.value;
      }

      this.service.updateIdeia(this.ideia).subscribe(
        data => this.alert.open('Informações Atualizadas!', '', {
          duration: 2000
        }),
        error => console.log(error)
      )
    }
  }
  ngOnInit() {
    this.getCategorias();

    this.getPais();

    /*this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
    });*/
    this.step1 = this.fb.group({
      post_usuario: this.fb.group({ id: this.post_usuario.id }),
      titulo: [null, Validators.compose([this.noWhitespaceValidator])],
      categoria_id: this.fb.group({
        id: [null, Validators.compose([Validators.required])]
      }),
      pais: this.fb.group({
        id: [null, Validators.compose([Validators.required])]
      }),
      data_ini: [null, Validators.compose([Validators.required])],
      data_fim: [null, Validators.compose([Validators.required])],
      descricao: [null, Validators.compose([this.noWhitespaceValidator])],
      etapas: [null, Validators.compose([Validators.required])],
      titular: [null],
      agencia: [null, Validators.maxLength(4)],
      banco: [null],
      conta: [null],
      contato:[null, Validators.compose([CustomValidators.email])],
      meta_arrecadacao: [null],
      total_arrecadacao: [null]

    });


    //Editando Usuario
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      //this.title = id ? 'Edit User' : 'New User';

      if (!id)
        return;
      this.service.getIdeiaDetail(id)
        .subscribe(
          ideia => {
            this.ideia = ideia,
            console.log(ideia)
              this.step1.patchValue({
                categoria_id: { id: this.ideia.categoria_id.id },
                pais: { id: this.ideia.pais.id }
              }),

              this.step1.controls.data_ini.setValue(new Date(this.ideia.data_ini));
            this.step1.controls.data_fim.setValue(new Date(this.ideia.data_fim));
            this.step2.controls.image.setValue(this.ideia.img);

          },

          response => {

            if (response.status == 404) {
              console.log('nao encontrado')
            }
          });

    });
  }

  private getCategorias() {
    this.service.getCategorias().subscribe(data => {
      this.categorias = data;
    }, error => {
      console.log(error);
    });
  }

  private getPais() {
    this.service.getPais()
      .subscribe(pais => {
        this.paises = pais;
      }, response => {
        if (response.status == 404) {
          console.log('nao encontrado');
        }
      });
  }
}
