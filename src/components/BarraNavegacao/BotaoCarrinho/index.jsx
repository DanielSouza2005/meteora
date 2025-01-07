import React from "react";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";

import imagemCarrinho from "/assets/cart.svg";

const BotaoCarrinho = ({ className }) => {
  const classesComuns = "btn ms-3";
  const { quantidadeCarrinho } = useCarrinhoContext();

  return (
    <button
      className={`${classesComuns} ${className}`}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#modalCarrinhoSuspenso"
      aria-controls="modalCarrinhoSuspenso"
    >
      <img src={imagemCarrinho} alt="ícone de um carrinho de supermercado" />
      {quantidadeCarrinho !== 0 && (
        <span className="badge verde-limao">{quantidadeCarrinho}</span>
      )}
    </button>
  );
};

export default BotaoCarrinho;
