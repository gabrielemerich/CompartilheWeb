import { Usuario } from "../auth/signin/shared/user";
import { Pais } from "../ideia/shared/pais";

export class Perfil{
    id: number;
    sobre: string;
    profissao: string;
    foto: string;
    telefone: string;
    pais_id: Pais;
    contato: string;
    website: string;
    image: string;

}