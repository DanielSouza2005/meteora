import React from "react";
import Titulo from "@/components/Titulo";
import ValorFormatado from "@/components/ValorFormatado";
import { formatadorMoeda } from "@/utils/formatadorMoeda"
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";;

const ResumoCompra = () => {

  const { valorTotalCarrinho, quantidadeCarrinho } = useCarrinhoContext();

  return (
    <div className="bg-black p-4">
      <Titulo element="h5" className="text-center fw-bold">
        Sumário
      </Titulo>
      <div className="d-flex flex-row justify-content-between">
        <p className="m-0">{quantidadeCarrinho} produtos</p>
        <span>{formatadorMoeda(valorTotalCarrinho)}</span>
      </div>
      <div className="divisor__verde my-3" />
      <div className="d-flex flex-row justify-content-between">
        <p className="verde-limao m-0">Total</p>
        <ValorFormatado className="verde-limao" valor={valorTotalCarrinho} />
      </div>
    </div>
  );
};

export default ResumoCompra;
