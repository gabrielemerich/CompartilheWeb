import { Perfil } from "src/app/profile/perfil";

export class Usuario {

    id: number;
    private email: string;
    nome: string;
    profile_id: number;
    private senha: string;
    profile: Perfil;

   

    get Nome(){
        return this.nome;
    }
    set Nome(nome: string){
        this.nome = nome;
    }

    get Email(){
        return this.email;
    }
    set Email(email: string){
        this.email = email;
    }

    get Senha(){
        return this.senha;
    }
    set Senha(senha: string){
        this.senha = senha;
    }


}