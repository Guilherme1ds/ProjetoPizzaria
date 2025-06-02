let pizzaria = [];
let pizzaParaAlterar;

let resultado = document.getElementById("cadastrofeito");
let resulbuscalt = document.getElementById("buscalterarfeito");
let resulalt = document.getElementById("alterarfeito");
let resulvenda = document.getElementById("vender");
let resulrelat = document.getElementById("relato");

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
    document.getElementById("alterar").classList.add("hidden");
    document.getElementById("venda").classList.add("hidden");
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
        resultado.innerHTML = ("Pizza cadastrada com sucesso!");
    } else {
        resultado.innerHTML = ("Por favor, preencha todos os campos");
    }
}

function buscarPizza() {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const resultados = pizzaria.filter((pizza) =>
      pizza.nome.toLowerCase().includes(pesquisa)
    );
    atualizarCardapio(resultados);
}

function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = pizzaria.find((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
    document.getElementById("novo-ingrediente").value = pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
  } else {
    resulbuscalt.innerHTML = ("Pizza não encontrada");
  }

  setTimeout(() => {
        resulbuscalt.classList.add("hidden");
    }, 3000);
}

function alterarPizza() {
  if (pizzaParaAlterar) {
    const novoNome = document.getElementById("novo-nome").value;
    const novoIngrediente = document.getElementById("novo-ingrediente").value;
    const novoPreco = parseInt(document.getElementById("novo-preco").value);

    if (novoNome && novoIngrediente && novoPreco) {
      pizzaParaAlterar.nome = novoNome;
      pizzaParaAlterar.ingredientes = novoIngrediente;
      pizzaParaAlterar.preco = novoPreco;

      atualizarCardapio();
      resulalt.innerHTML = ("Pizza alterada com sucesso!");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      resulalt.innerHTML = ("Por favor, preencha todos os campos.");
    }
  }
}

function atualizarCardapio(lista = pizzaria) {
    const tabela = document.getElementById("lista-pizzas");
    tabela.innerHTML = "";

    lista.forEach((pizza) => {
    const linha = document.createElement("tr"); 
    linha.innerHTML = `
    <td>${pizza.nome}</td>
    <td>${pizza.ingredientes}</td>
    <td>R$${pizza.preco}</td>
    `;
    tabela.appendChild(linha);
    })
}

let vendas = []

function registrarVenda() {
  const nome = document.getElementById('venda-nome').value;
  const preco = document.getElementById('venda-preco').value;
  const cliente = document.getElementById('venda-cliente').value;

  if (nome && preco && cliente) {
    const listaVendas = document.getElementById('lista-vendas');
    const item = document.createElement('li');
    item.textContent = `Sabor: ${nome}, Preço: R$${preco}, Cliente: ${cliente}`;
    listaVendas.appendChild(item);

    vendas.push({ nome, preco, cliente });

    document.getElementById('venda-nome').value = '';
    document.getElementById('venda-preco').value = '';
    document.getElementById('venda-cliente').value = '';
  } else {
    resulvenda.innerHTML = ('Por favor, preencha todos os campos');
  }

  setTimeout(() => {
    resulvenda.classList.add("hidden");
  }, 3000);
}

function gerarRelatorioVendas() {
  const tabelaRelatorio = document.getElementById('tabela-relatorio-vendas');
    tabelaRelatorio.innerHTML = ''; 

    if (vendas.length === 0) {
        resulrelat.innerHTML = ('Nenhuma venda registrada.');
        return;
    }

    let totalVendas = 0; 

    if (vendas.length == 0) {
        resulrelat.innerHTML = ('Valor de Venda não registrado!');
        return;
    }

    vendas.forEach((venda) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
        <td>${venda.nome}</td>
        <td>R$${parseFloat(venda.preco).toFixed(2)}</td>
        <td>${venda.cliente}</td>
    `;
    tabelaRelatorio.appendChild(linha);

    totalVendas += parseFloat(venda.preco);
  });

  const linhaTotal = document.createElement('tr');
  linhaTotal.innerHTML = `
  <td><strong>Total</strong></td>
  <td><strong>R$${totalVendas.toFixed(2)}</strong></td>
  <td><td>
`;
tabelaRelatorio.appendChild(linhaTotal);

document.getElementById('relatorio-vendas').classList.remove('hidden');
}
