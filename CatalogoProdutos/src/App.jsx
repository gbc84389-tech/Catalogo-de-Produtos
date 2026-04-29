import './App.css'
import ProdutoCard from './components/ProdutoCard.jsx'
import Formulario from './components/Forms.jsx'
import { useEffect, useRef, useState } from 'react';

function App() {
  const [produto, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const startXref = useRef(0);
  const containerRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  function AdicionarProduto(novoProduto) {
    setProdutos([...produto, novoProduto]);
  }

  useEffect(() => {
    const dados = localStorage.getItem("produtos");
    setTimeout(() => {
      setLoading(true);
      if (dados) {
        const lista = JSON.parse(dados);
        setProdutos(lista);
      } else {
        const produtosFake = [{
          id: 1,
          imagem: "https://placehold.co/200x300/503355/FFF",
          nome: "Produto 1",
          preco: "10.00",
          descricao: "..."
        }];
        localStorage.setItem("produtos", JSON.stringify(produtosFake));
        setProdutos(produtosFake);
      }
      setLoading(false);
    }, 2000);
  }, [])

  return (
    <>

      <div className = "carregando-produtos">
        {loading ? "Carregando Produtos..." : "Produtos"}
      </div>

      <div className={produto.length > 0 ? "Produto-card-container" : ""} ref={containerRef}
        onMouseDown={(evento) => {
          isDraggingRef.current = true;
          scrollLeftRef.current = containerRef.current.scrollLeft;
          startXref.current = evento.pageX;
          evento.preventDefault();
        }}

        onMouseUp={() => {
          isDraggingRef.current = false;
        }}

        onMouseMove={(evento) => {
          if (!isDraggingRef.current) return;
          console.log("Arrastando");
          const movimento = (evento.pageX - startXref.current) * 1.5;
          const novoScroll = scrollLeftRef.current - movimento;
          containerRef.current.scrollLeft = novoScroll;
        }}

        onMouseLeave={() => {
          isDraggingRef.current = false;
        }}>

        {produto.map(produto => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
      <Formulario AdicionarProduto={AdicionarProduto} />
    </>
  );

}
export default App
