import React, { useContext } from "react";
import Botao from "@/components/Botao";
import Quantidade from "@/components/Quantidade";
import ValorFormatado from "@/components/ValorFormatado";
import InfoItemCarrinho from "./InfoItemCarrinho";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const ItemCarrinho = ({ itemCarrinho }) => {

  const { aoRemoverProdutoDoCarrinho } = useContext(CarrinhoContext);

  return (
    <li key={itemCarrinho.id}>
      <>
        <div className="produto">
          <img
            className="imagem__produto"
            src={itemCarrinho.src}
            alt={itemCarrinho.alt}
          />
          <InfoItemCarrinho itemCarrinho={itemCarrinho} />
          <ValorFormatado valor={itemCarrinho.preco} />
          <Quantidade
            itemCarrinho={itemCarrinho}
          />
          <Botao
            variant="deleteItem"
            aria-label="Excluir"
            handleClick={() => aoRemoverProdutoDoCarrinho(itemCarrinho.id)}
          >
            delete_forever
          </Botao>
        </div>
        <div className="divisor my-5" />
      </>
    </li>
  );
};

export default ItemCarrinho;
