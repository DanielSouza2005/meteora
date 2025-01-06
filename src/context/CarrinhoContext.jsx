import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([]);

    const aoAdicionarProduto = (novoProduto) => {
        setCarrinho((carrinhoAnterior) => {
            const ProdutoExiste = carrinhoAnterior.some((itemCarrinho) => itemCarrinho.id === novoProduto.id);

            if (ProdutoExiste) {
                return carrinhoAnterior.map((itemDoCarrinho) =>
                    itemDoCarrinho.id === novoProduto.id
                        ? { ...itemDoCarrinho, quantidade: itemDoCarrinho.quantidade += 1 }
                        : itemDoCarrinho
                );
            }

            return [...carrinhoAnterior, { ...novoProduto, quantidade: 1 }];
        });
    };

    const aoRemoverProduto = (id) => {
        setCarrinho((carrinhoAnterior) => {
            const produtoRemovido = carrinhoAnterior.find((itemCarrinho) => itemCarrinho.id === id);
            const ultimoProduto = produtoRemovido.quantidade === 1;

            // REMOVE DO CARRINHO
            if (ultimoProduto) {
                return carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
            }

            // DIMINUI EM -1 A QUANTIDADE DO PRODUTO NO CARRINHO
            return carrinhoAnterior.map((itemDoCarrinho) =>
                itemDoCarrinho.id === id
                    ? { ...itemDoCarrinho, quantidade: itemDoCarrinho.quantidade -= 1 }
                    : itemDoCarrinho
            );
        });
    }

    const aoRemoverProdutoDoCarrinho = (id) => {
        // REMOVE DO CARRINHO
        setCarrinho((carrinhoAnterior) => {
            return carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
        });
    }

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, aoAdicionarProduto, aoRemoverProduto, aoRemoverProdutoDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}