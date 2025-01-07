import { useContext, useEffect } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {

    const { carrinho, setCarrinho, 
            quantidadeCarrinho, setQuantidadeCarrinho, 
            valorTotalCarrinho, setValorTotalCarrinho } = useContext(CarrinhoContext);

    const mudarQuantidadeCarrinho = (id, quantidade, carrinhoAtual) => {
        return carrinhoAtual.map((itemDoCarrinho) => 
            itemDoCarrinho.id === id 
                ? { ...itemDoCarrinho, quantidade: itemDoCarrinho.quantidade += quantidade }
                : itemDoCarrinho
        );
    }

    const aoAdicionarProduto = (novoProduto) => {
        setCarrinho((carrinhoAnterior) => {
            const ProdutoExiste = carrinho.some((itemCarrinho) => itemCarrinho.id === novoProduto.id);

            //SE O PRODUTO EXISTE, INCREMENTA A QTDE EM 1
            if (ProdutoExiste) {
               return mudarQuantidadeCarrinho(novoProduto.id, 1, carrinhoAnterior);
            }

            //POR PADRÃO, INCLUI UM NOVO PRODUTO NO CARRINHO
            return [...carrinhoAnterior, { ...novoProduto, quantidade: 1 }];
        });
    };

    const aoRemoverProduto = (id) => {
        setCarrinho((carrinhoAnterior) => {
            const produtoRemovido = carrinho.find((itemCarrinho) => itemCarrinho.id === id);
            const ultimoProduto = produtoRemovido.quantidade === 1;

            // REMOVE DO CARRINHO
            if (ultimoProduto) {
                return carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
            }

            // DIMINUI EM -1 A QUANTIDADE DO PRODUTO NO CARRINHO
            return mudarQuantidadeCarrinho(id, -1, carrinhoAnterior);
        });
    }

    const aoRemoverProdutoDoCarrinho = (id) => {
        // REMOVE DO CARRINHO
        setCarrinho((carrinhoAnterior) => {
            return carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
        });
    }

    useEffect(() => {
        const { totalTemp, quantidadeTemp } = carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade
        }), {
            quantidadeTemp: 0,
            totalTemp: 0
        });

        setQuantidadeCarrinho(quantidadeTemp);
        setValorTotalCarrinho(totalTemp);
    }, [carrinho]);

    return {
        carrinho, setCarrinho, 
        aoAdicionarProduto, aoRemoverProduto, aoRemoverProdutoDoCarrinho,
        quantidadeCarrinho, valorTotalCarrinho
    };
};