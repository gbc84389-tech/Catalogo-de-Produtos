function ProdutoCard({produto}) {
    return (
        <div className = "Produto-item-container">
            <img src="https://placehold.co/200x300/80743D/FFF" alt={produto.nome} />
            <h2>{produto.nome}</h2>
            <span>{produto.preco}</span>
            <p>{produto.descricao}</p>
        </div>
    );
};

export default ProdutoCard;