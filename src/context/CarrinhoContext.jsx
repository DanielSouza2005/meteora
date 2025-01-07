import { createContext, useState, useReducer, useEffect, useMemo } from "react";
import { carrinhoReducer } from "@/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, dispatchCarrinho] = useReducer(carrinhoReducer, []);
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade
        }), {
            quantidadeTemp: 0,
            totalTemp: 0
        });
    }, [carrinho]);

    useEffect(() => {
        setQuantidadeCarrinho(quantidadeTemp);
        setValorTotalCarrinho(totalTemp);
    });

    return (
        <CarrinhoContext.Provider value={{ carrinho, dispatchCarrinho, quantidadeCarrinho, valorTotalCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}