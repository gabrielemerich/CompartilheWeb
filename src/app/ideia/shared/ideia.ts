import { Categoria } from "./categoria";
import { Usuario } from "../../auth/signin/shared/user";
import { Pais } from "./pais";
export enum Etapas {
    "DEV" = 30
}
export class Ideia{
  
     id: number;
    titulo: string;
    categoria_id: Categoria;
    public descricao: string;
    public data_ini: string;
    public data_fim: string;
    public facebook: string;
    public twitter: string;
    public instagram: string;
    pais: Pais;
    public img: any;
    private likes: number;
    post_usuario: Usuario;
    etapas: string;
    agencia: number;
    conta: number;
    banco: string;
    titular: string;
    contato:string;
    meta_arrecadacao: number;
    total_arrecadacao: number;


    get Id(){
        return this.id;
    }

    set Id(id: number){
        this.id = id;
    }
    
    get Titulo(){
        return this.titulo;
    }
    set Titulo(titulo: string){
        this.titulo = titulo;
    }

    get DataIni(){
        return this.data_ini;
    }
    set DataIni(data_ini: string){
        this.data_ini = data_ini;
    }

    get DataFim(){
        return this.data_fim;
    }
    set DataFim(data_fim: string){
        this.data_fim = data_fim;
    }

    get Pais(){
        return this.pais;
    }
    set Pais(pais: Pais){
        this.pais = pais;
    }

    get Categoria(): Categoria{
        return this.categoria_id;
    }

    set Categoria(categoria: Categoria){
        this.categoria_id = categoria;
    }

    get Descricao(){
        return this.descricao;
    }

    set Descricao(descricao: string){
        this.descricao = descricao;
    }

    get Img(){
        return this.img;
    }

    set Img(img: any){
        this.img = img;
    }

    get PostUser(){
        return this.post_usuario;
    }
    set PostUser(postuser: Usuario){
       this.post_usuario = postuser;
    }

    get Likes(){
        return this.likes;
    }

    set Likes(likes: number){
        this.likes = likes;
    }
}