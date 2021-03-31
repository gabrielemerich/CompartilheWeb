export class Equipe{
    public id: number
    public nome: string;
    public descricao: string;
    public usuarios = [];


   get Nome(){
       return this.nome;
   }

   set Descricao(descricao: string){
       this.descricao = descricao;
   }
}