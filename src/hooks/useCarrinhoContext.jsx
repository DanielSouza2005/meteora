import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
    ADD_PRODUTO,
    REMOVE_PRODUTO,
    UPDATE_QUANTIDADE
} from "@/reducers/carrinhoReducer";

const addProdutoAcao = (novoProduto) => ({
    tipo: ADD_PRODUTO,
    payload: novoProduto
});

const removeProdutoAcao = (produtoId) => ({
    tipo: REMOVE_PRODUTO,
    payload: produtoId
});

const updateQuantidadeAcao = (produtoId, quantidade) => ({
    tipo: UPDATE_QUANTIDADE,
    payload: { produtoId, quantidade }
});

export const useCarrinhoContext = () => {

    const { carrinho, dispatchCarrinho,
        quantidadeCarrinho, valorTotalCarrinho } = useContext(CarrinhoContext);

    const aoAdicionarProduto = (novoProduto) => {
        dispatchCarrinho(addProdutoAcao(novoProduto));
    };

    const aoRemoverProduto = (id) => {
        const produto = carrinho.find((item) => item.id === id);

        if (produto && produto.quantidade > 1) {
            //DIMINUI A QUANTIDADE DO PRODUTO NO CARRINHO
            dispatchCarrinho(updateQuantidadeAcao(id, produto.quantidade - 1));
        }
        else {
            //REMOVE O PRODUTO DO CARRINHO COMPLETAMENTE
            dispatchCarrinho(removeProdutoAcao(id));
        }
    }

    const aoRemoverProdutoDoCarrinho = (id) => {
        //REMOVE O PRODUTO DO CARRINHO COMPLETAMENTE
        dispatchCarrinho(removeProdutoAcao(id));
    }

    return {
        carrinho,
        aoAdicionarProduto, aoRemoverProduto, aoRemoverProdutoDoCarrinho,
        quantidadeCarrinho, valorTotalCarrinho
    };
};