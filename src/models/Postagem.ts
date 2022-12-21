import Tema from "./Tema"


interface postagem{
    id: number;
    titulo: string;
    texto: string;
    tema?: Tema|null

}
export default postagem;