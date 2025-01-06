import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([]);

    const aoAdicionarProduto = (novoProduto) => {
        setCarrinho((carrinhoAnterior) => {
            const ProdutoExiste = carrinho.some((itemCarrinho) => itemCarrinho.id === novoProduto.id);

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

    }

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, aoAdicionarProduto }}>
            {children}
        </CarrinhoContext.Provider>
    );
}