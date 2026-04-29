import {useState} from 'react'

function Formulario({AdicionarProduto}) {
    const [imagem, setImagem] = useState("");
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");

    function handleSubmit() {
        const novoProduto = {
            id: Date.now(),
            imagem,
            nome,
            preco,
            descricao
        };
        AdicionarProduto(novoProduto);

        setNome("");
        setPreco("");
        setDescricao("");

        const dados = localStorage.getItem("produtos");
        const lista = JSON.parse(dados) || [];
        const novaLista = [...lista, novoProduto];
        localStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    return(
        <div className = "container-forms">
            <div className = "container-item">
                <label htmlFor="" className = "produto-label">Nome do produto</label>
                <input type="text" value = {nome} onChange={(e) => setNome(e.target.value)} className = "produto-input"/>
            </div>

            <div className = "container-item">
                <label htmlFor="" className = "produto-label">Preco do produto</label>
                <input type="text" value = {preco} onChange={(e) => setPreco(e.target.value)} className = "produto-input"/>
            </div>

            <div className = "container-item">
                <label htmlFor="" className = "produto-label">Descricao do produto</label>
                <input type="text" value = {descricao} onChange={(e) => setDescricao(e.target.value)} className = "produto-input"/>
            </div>
            <button onClick={handleSubmit}> Adicionar produto</button>
        </div>
    )
}

export default Formulario;