import mysql from 'mysql2/promise';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import express from 'express';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

interface IQuantidadePedido extends RowDataPacket {
    quantidade_pedidos: number
}
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'sistema',
});



                  //  Exercícios de POST

app.get("/produto", async (req, res) => {
    try {
        const [produtos] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM produto"
        );

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar produtos"
        });
    }
});

// Exercício 1
//  Modifique a rota POST /pessoas para validar os dados. Se id ou
// nome estiverem ausentes ou vazios, retornar status 400 com
// mensagem de erro. Se válidos, inserir no banco e retornar 201.

app.post("/pessoas", async (req, res) => {
  const { id, nome } = req.body;
  if (!id || !nome) {
    return res.status(400).json({
      mensagem: "Id e nome são obrigatórios!"
    });
  }
  await connection.execute(
    "INSERT INTO pessoa (id, nome) VALUES (?, ?)",
    [id, nome]
  );
  return res.status(201).json({
    mensagem: "Pessoa cadastrada com sucesso!"
  });
});

// Exercício 2
// Crie a rota POST /cadastro_produto_v2. O cliente envia apenas id, nome, categoria e preco. O servidor deve gerar data_criacao automaticamente com new Date() e inserir data_modificacao como null. Retornar 201 com mensagem de sucesso.


app.post("/cadastro_produto_v2", async (req, res) => {
  const { id, nome, categoria, preco } = req.body;

  await connection.execute(`INSERT INTO produto (id, nome, categoria, preco, data_criacao, data_modificacao) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, nome, categoria, preco, new Date(), null]
  );

  return res.status(201).json({
    mensagem: "Produto cadastrado com sucesso!"
  });
});

// Exercício 3

app.post("/cadastro_multiplos_produtos", async (req, res) => {
  try {
    const produtos = req.body;
    if (!Array.isArray(produtos)) {
      return res.status(400).json({ erro: "O corpo da requisição deve ser uma lista (array) de produtos." });
    }

    for (const produto of produtos) {
      await connection.execute(   `INSERT INTO produto    (nome, categoria, preco, data_criacao, data_modificacao)     VALUES (?, ?, ?, ?, ?)`,
        [
          produto.nome,
          produto.categoria,
          produto.preco,
          new Date(), 
          null        
        ]
      );
    }
    return res.status(201).json({
      mensagem: `${produtos.length} produtos cadastrados com sucesso!`
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro interno ao cadastrar os produtos." });
  }
});

                          // Exercícios de PUT 

// Na exercício anterior, criamos juntos a rota PUT /produto/:id que atualiza um produto no banco. Porém, o código que fizemos possui um problema: se o cliente não enviar todos os campos no body, os campos não enviados são sobrescritos com null, apagando os dados que já estavam salvos no banco.


app.put("/produto/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria } = req.body;

    try {
        const [produtos] = await connection.execute<RowDataPacket[]>(  "SELECT * FROM produto WHERE id = ?", [id]  );

        if (produtos.length === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
        }
        const produtoAtual = produtos[0]!;
        const nomeFinal = nome ?? produtoAtual.nome;
        const precoFinal = preco ?? produtoAtual.preco;
        const categoriaFinal = categoria ?? produtoAtual.categoria;

        await connection.execute(  ` UPDATE produto   SET nome = ?, preco = ?, categoria = ?   WHERE id = ?`,
            [nomeFinal, precoFinal, categoriaFinal, id]
        );
        return res.status(200).json({ mensagem: "Produto atualizado com sucesso!",
            dados: {  nome: nomeFinal,preco: precoFinal,categoria: categoriaFinal  }  });
    } catch (erro) {
        console.error(erro); // Ajuda você a ver o erro real no terminal se algo falhar
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
});

// Exercício 3
// Criar a rota PUT /produto_preco/:id. Recebe o id pela URL e o novo preço pelo body. Além do preço, o servidor deve atualizar data_modificacao automaticamente com new Date(). Retornar 404 se não encontrar, 200 se atualizar.

app.put("/produto_preco/:id", async (req, res) => {
    const { id } = req.params;
    const { preco } = req.body;
    try {
        const [produtos] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM produto WHERE id = ?",
            [id]
        );
        if (produtos.length === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
        }
        await connection.execute( `  UPDATE produto SET preco = ?, data_modificacao = ? WHERE id = ? `,
            [preco, new Date(), id]
        );
        return res.status(200).json({
            mensagem: "Preço atualizado com sucesso!"
        });
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
});

          // Exercícios de PATCH

// EXERCÍCIO 1
app.patch("/pessoa/:id", async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({
            mensagem: "O campo nome é obrigatório!"
        });
    }
    try {
        const [pessoa] = await connection.execute<RowDataPacket[]>(  "SELECT * FROM pessoa WHERE id = ?",   [id]   );
        if (pessoa.length === 0) {
            return res.status(404).json({
                mensagem: "Pessoa não encontrada!"
            });
        }
        await connection.execute(
            "UPDATE pessoa SET nome = ? WHERE id = ?",
            [nome, id]
        );
        res.status(200).json({
            mensagem: "Pessoa atualizada com sucesso!"
        });
    } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : String(erro);
        res.status(500).json({ erro: mensagem });
    }
});

// EXERCÍCIO 2
app.patch("/produto/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria } = req.body || {};
    try {
        const [rows] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM produto WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
        }
        const produto = rows[0] as RowDataPacket;
        await connection.execute( `UPDATE produto   SET nome = ?,   preco = ?,    categoria = ?, data_modificacao = NOW()HERE id = ?`,
            [
                nome ?? produto.nome,
                preco ?? produto.preco,
                categoria ?? produto.categoria,
                id
            ]
        );
        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
});

// EXERCÍCIO 3
app.patch("/produto_categoria", async (req, res) => {
    const { categoria_atual, nova_categoria } = req.body || {};

    try {
        const [produtos] = await connection.execute(
            "SELECT * FROM produto WHERE categoria = ?",
            [categoria_atual]
        );
        if (Array.isArray(produtos) && produtos.length === 0) {
            return res.status(404).json({
                mensagem: "Nenhum produto encontrado com essa categoria!"
            });
        }
        const [resultado] = await connection.execute( `UPDATE produto     SET categoria = ?,         data_modificacao = NOW()  WHERE categoria = ?`, [nova_categoria, categoria_atual]   );
        const affected = (resultado as any).affectedRows ?? 0;
        return res.status(200).json({
            mensagem: `${affected} produtos atualizados com sucesso!`
        });
    } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : String(erro);
        return res.status(500).json({ erro: mensagem });
    }
});

// EXERCÍCIO 4

app.patch("/produto_desconto/:id", async (req, res) => {
    const { id } = req.params;
    const { percentual_desconto } = req.body || {};
    if (percentual_desconto === undefined || typeof percentual_desconto !== 'number') {
        return res.status(400).json({
            mensagem: "Por favor, informe o 'percentual_desconto' como um número no corpo da requisição."
        });
    }
    if (percentual_desconto < 0 || percentual_desconto > 100) {
        return res.status(400).json({
            mensagem: "O percentual de desconto deve ser um valor entre 0 e 100."
        });
    }
    try {
        const [rows] = await connection.execute<RowDataPacket[]>(
            "SELECT * FROM produto WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado!"
            });
        }
        const produto = rows[0] as RowDataPacket;
        const precoAtual = Number(produto.preco);
        const novoPreco = precoAtual - (precoAtual * percentual_desconto / 100);
        await connection.execute(  `UPDATE produto  SET preco = ?,   data_modificacao = NOW() WHERE id = ?`, [novoPreco, id] );
        return res.status(200).json({
            mensagem: `Desconto aplicado! Novo preço: R$ ${novoPreco.toFixed(2)}`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
});

                        // Exercícios Delete

// Exercicio 1

app.delete("/produto/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await connection.execute<ResultSetHeader>(   "DELETE FROM produto WHERE id = ?",    [id] );
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                mensagem: "Produto não encontrado!" 
            });
        }
        return res.status(200).json({ 
            mensagem: "Produto deletado com sucesso!" 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});

// Exercicio 2

app.delete("/pessoa/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.execute<RowDataPacket[]>(    "SELECT id FROM pessoa WHERE id = ?",    [id] );
        if (rows.length === 0) {
            return res.status(404).json({ 
                mensagem: "Pessoa não encontrada!" 
            });
        }

        await connection.execute(  "DELETE FROM pessoa WHERE id = ?", [id]  );
        return res.status(200).json({ 
            mensagem: "Pessoa deletada com sucesso!" 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});

// Exercicio3

app.delete("/produto_categoria/:categoria", async (req, res) => {
  const { categoria } = req.params;

  try {
    const [result] = await connection.execute<ResultSetHeader>( "DELETE FROM produto WHERE categoria = ?", [categoria] );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Nenhum produto encontrado nessa categoria!"
      });
    }

    return res.status(200).json({
      mensagem: `${result.affectedRows} produtos deletados com sucesso!`
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000")
})