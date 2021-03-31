import { Usuario } from "../auth/signin/shared/user";
import { Ideia } from "../ideia/shared/ideia";

export class Feed{

    descricao: string;
    post_feed: Ideia;
    user_feed: Usuario;
    data: string;
}