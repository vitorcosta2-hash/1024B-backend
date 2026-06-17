const API = "http://localhost:8000";

async function carregarProdutos() {
    const resposta = await fetch(`${API}/produto`);
    const produtos = await resposta.json();

    const tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = "";

    produtos.forEach(produto => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${produto.preco}</td>

                <td>
                    <button onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button onclick="deletarProduto(${produto.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function cadastrarProduto() {

    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const preco = Number(document.getElementById("preco").value);

    await fetch(`${API}/cadastro_produto_v2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Date.now(),
            nome,
            categoria,
            preco
        })
    });

    carregarProdutos();
}

async function editarProduto(id) {

    const novoNome = prompt("Novo nome:");

    if (!novoNome) return;

    await fetch(`${API}/produto/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: novoNome
        })
    });

    carregarProdutos();
}

async function deletarProduto(id) {

    await fetch(`${API}/produto/${id}`, {
        method: "DELETE"
    });

    carregarProdutos();
}

carregarProdutos();