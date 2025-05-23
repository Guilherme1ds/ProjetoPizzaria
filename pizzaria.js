let pizzaria = [];
let pizzaParaAlterar;
let resultado = document.getElementById("cadastrofeito");

function exibirMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.classList.remove("hidden");

    setTimeout(() => {
        mensagem.classList.add("hidden");
    }, 3000);
}

function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarioCorreto = "admin";
  const senhaCorreta = "1234";

  if (usuario == usuarioCorreto && senha == senhaCorreta) {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000); 
  } else {
    exibirMensagem("Usuário ou senha incorretos.", "erro");
  }
}

function mostrarSecao(secao) {
    document.getElementById("consulta").classList.add("hidden");
    // document.getElementById("config").classList.add("hidden");
    // document.getElementById("pedidos").classList.add("hidden");
    // document.getElementById("logar").classList.add("hidden")
    document.getElementById("cadastro").classList.add("hidden");

    document.getElementById(secao).classList.remove("hidden");
}

function cadastrarPizza() {
    const nome = document.getElementById("nome").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const preco = document.getElementById("preco").value;
    
    if (nome && ingredientes && preco) {
        pizzaria.push({ nome, ingredientes, preco });
        document.getElementById("nome").value = "";
        document.getElementById("ingredientes").value = "";
        document.getElementById("preco").value = "";
        atualizarCardapio();
        resultado.innerHTML = "Pizza cadastrada com sucesso!";
    } else {
        resultado.innerHTML = "Por favor, preencha todos os campos";
    }
}

function buscarPizza() {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const resultados = pizzaria.filter((pizza) =>
      pizza.nome.toLowerCase().includes(pesquisa)
    );
    atualizarCardapio(resultados);
}

function atualizarCardapio(lista = pizzaria) {
    const tabela = document.getElementById("lista-pizzas");
    tabela.innerHTML = "";

    lista.forEach((pizza) => {
    const linha = document.createElement("tr"); 
    linha.innerHTML = `
    <td>${pizza.nome}</td>
    <td>${pizza.ingredientes}</td>
    <td>${pizza.preco}</td>
    `;
    tabela.appendChild(linha);
    })
}
