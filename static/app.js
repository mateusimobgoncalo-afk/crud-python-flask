function mostrarMensagem(texto, tipo = "sucesso") {
  const box = document.getElementById("mensagem");
  box.textContent = texto;
  box.className = `mensagem ${tipo}`;
}

async function carregarProdutos() {
  const resposta = await fetch("/produtos");
  const produtos = await resposta.json();

  // Ordena por nome (A-Z)
  produtos.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  produtos.forEach((p) => {
    const item = document.createElement("li");
    item.className = "lista-item";

    item.innerHTML = `
      <strong>${p.nome}</strong> - R$ ${Number(p.preco).toFixed(2)}
      <button onclick="editarProduto(${p.id}, '${p.nome}', ${p.preco})">Editar</button>
      <button onclick="excluirProduto(${p.id})">Excluir</button>
    `;

    lista.appendChild(item);
  });
}

async function salvarProduto() {
  const id = document.getElementById("produtoId").value;
  const nome = document.getElementById("nome").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || isNaN(preco)) {
    mostrarMensagem("Preencha nome e preço corretamente.", "erro");
    return;
  }

  const dados = { nome, preco };

  let resposta;
  if (id) {
    resposta = await fetch(`/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
  } else {
    resposta = await fetch("/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
  }

  if (!resposta.ok) {
    const erro = await resposta.json();
    mostrarMensagem(erro.erro || "Erro ao salvar produto.", "erro");
    return;
  }

  mostrarMensagem(id ? "Produto atualizado com sucesso." : "Produto criado com sucesso.", "sucesso");
  limparFormulario();
  carregarProdutos();
}

function editarProduto(id, nome, preco) {
  document.getElementById("produtoId").value = id;
  document.getElementById("nome").value = nome;
  document.getElementById("preco").value = preco;
  mostrarMensagem("Modo edição ativado.", "sucesso");
}

async function excluirProduto(id) {
  const confirmou = confirm("Tem certeza que deseja excluir este produto?");
  if (!confirmou) {
    return;
  }

  const resposta = await fetch(`/produtos/${id}`, { method: "DELETE" });

  if (!resposta.ok) {
    mostrarMensagem("Erro ao excluir produto.", "erro");
    return;
  }

  limparFormulario();
  mostrarMensagem("Produto excluído com sucesso.", "sucesso");
  carregarProdutos();
}

function limparFormulario() {
  document.getElementById("produtoId").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
}

carregarProdutos();
