import { Ideia } from "./ideia";
import { Usuario } from "../../auth/signin/shared/user";

export class Like{

    post_like: Ideia;
    usuario_like: Usuario;

    get PostLike(){
        return this.post_like;
    }

    set PostLike(post_like){
        this.post_like = post_like;
    }

    get UserLike(){
        return this.usuario_like;
    }

    set UserLike(us_like){
        this.usuario_like = us_like;
    }
}