// importacao de componentes
import Input from "./Input";
import Botao from "./Botao";

// estilizacao css
import "./Formulario.css"

import {useState} from "react";

function Formulario({titulo}) {
    const [cpf, setCpf] = useState("");

    const capturarCpf = (e) => {
        setCpf(e.target.value);
    }

    const btnPesquisar = () => {
        console.log(cpf);
    }

  return (
    <div id="formulario">
        <h1>{titulo}</h1>
        <Input props={"Nome: "} />
        <Input props={"Sobrenome: "} />

        <div id="pesquisar_cpf">
            <Input props={"Cpf: "} name={"cpf"} onChange={capturarCpf} />
            <Botao props={"Pesquisar"} onClick={btnPesquisar} />
        </div>
        <Input props={"Data de Nascimento: "} />
        <Botao props={"Salvar"} />
    </div>
  )
}

export default Formulario