import { StorageKeys } from "./localuser.usuario";
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService{

    getIdUsuarioLogado(): string {
        return localStorage.getItem(StorageKeys.id);
    }

    getNome():string{
        return localStorage.getItem(StorageKeys.nome);
    }

    getPerfil():string{
        return localStorage.getItem(StorageKeys.perfil);
    }

    removeItens(){
        localStorage.removeItem(StorageKeys.token);
        localStorage.removeItem(StorageKeys.id);
    }
}