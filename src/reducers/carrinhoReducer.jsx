export const ADD_PRODUTO = "ADD_PRODUTO";
export const REMOVE_PRODUTO = "REMOVE_PRODUTO";
export const UPDATE_QUANTIDADE = "UPDATE_QUANTIDADE";

export const carrinhoReducer = (estado, acao) => {

    switch (acao.tipo) {
        case ADD_PRODUTO:
            const novoProduto = acao.payload;
            const produto = estado.findIndex((item) => item.id === novoProduto.id);

            if (produto === -1) {
                novoProduto.quantidade = 1;
                return [...estado, novoProduto];
            }
            else {
                return estado.map((item, indice) =>
                    indice === produto
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                )
            }

        case REMOVE_PRODUTO:
            const produtoId = acao.payload;

            return estado.filter((item) => item.id !== produtoId);

        case UPDATE_QUANTIDADE:
            const { produtoId: id, quantidade } = acao.payload;

            return estado.map((item) =>
                item.id === id
                    ? { ...item, quantidade }
                    : item
            );

        default:
            return estado;
    }
};