import { Ideia } from "../../../ideia/shared/ideia";
import { Usuario } from "../../../auth/signin/shared/user";

export class Comentario{

    public id :number;
    public body:string;
    public data_hr: string;
    public post: Ideia;
    public usuario: Usuario;
    foto: string;
    

    get Id(){
        return this.id;
    }
    set Id(id: number){
        this.id = id;
    }

    get Body(){
        return this.body;
    }
    set Body(body: string){
        this.body = body;
    }

    get Usuario(){
        return this.usuario;
    }
    set Usuario(usuario: Usuario){
        this.usuario = usuario;
    }
    get Data_hr(){
        return this.data_hr;
    }
    set Data_hr(data: string){
        this.data_hr = data;
    }
    get Post(){
        return this.post;
    }
    set Post(post: Ideia){
        this.post = post;
    }

}