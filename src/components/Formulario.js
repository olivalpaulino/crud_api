// importacao de componentes
import Input from "./Input";
import Botao from "./Botao";

// estilizacao css
import "./Formulario.css"

import {useState} from "react";

function Formulario({titulo}) {
    const url = "http://localhost:3000/crudapi/";
    const [id, setId] = useState("");
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    const capturarDados = (e) => {
        if(e.target.name === "nome") {
            setNome(e.target.value);
        } else if(e.target.name === "sobrenome") {
            setSobrenome(e.target.value);
        } else if(e.target.name === "data_nascimento") {
            setDataNascimento(e.target.value);
        } else if(e.target.name === "cpf") {
            setCpf(e.target.value);
        }
    }

    const btnPesquisar = () => {
        console.log(cpf);
        getDados(url);
    }

    const btnSalvar = () => {
        console.log(nome, sobrenome, cpf, dataNascimento);
        inserirDados(url);
    }

    const btnAtualizar = () => {
        atualizarDados(url+id);
    }

    const btnDeletar = () => {
        deletarDados(url+id);
    }

    // requisicao http utilizando o method get para recurar os dados do json
   const getDados = (url) => {
    fetch(url).then(response => response.json()).then(data => {
        const pessoa = data.find(item => item.cpf === cpf);
        console.log(pessoa);

        setNome(pessoa.nome);
        setSobrenome(pessoa.sobrenome);
        setDataNascimento(pessoa.data_nascimento);
        setId(pessoa.id);

  }).catch(error => console.log("Cpf não encontrado!"));} 

  // inserir cadastro no json server via requisicao http com fetch utilizando o method post
  const inserirDados = (url) => {
    const dados = {
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      data_nascimento: dataNascimento
    };
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  // atualizar cadastro do json server via requisicao http com fetch utilizando o method put
  const atualizarDados = (url) => {
    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        data_nascimento: dataNascimento
      };
      
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }

  // deletar cadastro do json via requisicao http com o fetch utilizando o method delete
  const deletarDados = (url) => {

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
  }

  return (
    <div id="formulario">
        <h1>{titulo}</h1>
        <Input props={"Nome: "} name={"nome"} value={nome} onChange={capturarDados} />
        <Input props={"Sobrenome: "} name={"sobrenome"} value={sobrenome} onChange={capturarDados} />

        <div id="pesquisar_cpf">
            <Input props={"Cpf: "} name={"cpf"} onChange={capturarDados} />
            <Botao props={"Pesquisar"} onClick={btnPesquisar} />
        </div>
        <Input props={"Data de Nascimento: "} name={"data_nascimento"} value={dataNascimento} onChange={capturarDados} />
        <Botao props={"Salvar"} onClick={btnSalvar} />
        <Botao props={"Atualizar"} onClick={btnAtualizar} />
        <Botao props={"Deletar"} onClick={btnDeletar} />
    </div>
  )
}

export default Formulario