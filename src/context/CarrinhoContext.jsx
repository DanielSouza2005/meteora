import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, quantidadeCarrinho, setQuantidadeCarrinho, valorTotalCarrinho, setValorTotalCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}